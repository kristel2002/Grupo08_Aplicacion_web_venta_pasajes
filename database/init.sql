-- ---
-- 1. LIMPIEZA INICIAL 
-- ---
DROP TABLE IF EXISTS QuejasReclamos CASCADE;
DROP TABLE IF EXISTS ComentariosValoraciones CASCADE;
DROP TABLE IF EXISTS Reembolsos CASCADE;
DROP TABLE IF EXISTS Pagos CASCADE;
DROP TABLE IF EXISTS Reservas CASCADE;
DROP TABLE IF EXISTS Promociones CASCADE;
DROP TABLE IF EXISTS Vuelos CASCADE;
DROP TABLE IF EXISTS Aerolineas CASCADE;
DROP TABLE IF EXISTS Aeropuertos CASCADE;
DROP TABLE IF EXISTS TokensVerificacion CASCADE;
DROP TABLE IF EXISTS Usuarios CASCADE;
DROP TABLE IF EXISTS Asientos CASCADE;

-- Añadido CASCADE para una limpieza más segura
DROP TYPE IF EXISTS tipo_rol_usuario CASCADE;
DROP TYPE IF EXISTS tipo_token CASCADE;
DROP TYPE IF EXISTS tipo_clase_vuelo CASCADE;
DROP TYPE IF EXISTS estado_vuelo CASCADE;
DROP TYPE IF EXISTS estado_reserva CASCADE;
DROP TYPE IF EXISTS tipo_metodo_pago CASCADE;
DROP TYPE IF EXISTS estado_pago CASCADE;
DROP TYPE IF EXISTS tipo_comprobante_fiscal CASCADE;
DROP TYPE IF EXISTS estado_reembolso CASCADE;
DROP TYPE IF EXISTS estado_reclamo CASCADE;
DROP TYPE IF EXISTS tipo_pasajero CASCADE;
DROP TYPE IF EXISTS estado_asiento CASCADE;

DROP FUNCTION IF EXISTS trigger_set_timestamp() CASCADE;
DROP FUNCTION IF EXISTS trigger_confirmar_reserva() CASCADE;
DROP FUNCTION IF EXISTS trigger_controlar_cupo() CASCADE;


-- ---
-- 2. CREACIÓN DE TIPOS ENUM 
-- ---
CREATE TYPE tipo_rol_usuario AS ENUM ('Cliente', 'Administrador');
CREATE TYPE tipo_token AS ENUM ('VERIFICACION_EMAIL', 'RESETEO_PASSWORD');
CREATE TYPE tipo_clase_vuelo AS ENUM ('Economica', 'Ejecutiva', 'Primera');
CREATE TYPE estado_vuelo AS ENUM ('Programado', 'En Vuelo', 'Aterrizado', 'Cancelado', 'Retrasado');
CREATE TYPE estado_reserva AS ENUM ('Pendiente', 'Confirmada', 'Cancelada', 'No Presentado');
CREATE TYPE tipo_metodo_pago AS ENUM ('Tarjeta', 'Billetera Digital', 'Transferencia');
CREATE TYPE estado_pago AS ENUM ('Pendiente', 'Validado', 'Fallido', 'Reembolsado');
CREATE TYPE tipo_comprobante_fiscal AS ENUM ('Boleta', 'Factura');
CREATE TYPE estado_reembolso AS ENUM ('Pendiente', 'Aprobado', 'Rechazado');
CREATE TYPE estado_reclamo AS ENUM ('Recibido', 'En Progreso', 'Resuelto');
CREATE TYPE tipo_pasajero AS ENUM ('Adulto', 'Niño', 'Infante');
CREATE TYPE estado_asiento AS ENUM ('Disponible', 'Reservado', 'Ocupado');


-- ---
-- 3. TABLAS PRINCIPALES 
-- ---

-- Tabla: Usuarios (Cubre RF01, RF03, RF12, RF14, RF15, RF19)
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    documento_identidad VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol tipo_rol_usuario NOT NULL DEFAULT 'Cliente',
    esta_verificado BOOLEAN NOT NULL DEFAULT FALSE,
    puntos_fidelidad INT NOT NULL DEFAULT 0,
    acepta_notificaciones BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Timestamps
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE Usuarios IS 'Almacena clientes y administradores del sistema de vuelos.';

-- Tabla: TokensVerificacion (Cubre RF02, RF04)
CREATE TABLE TokensVerificacion (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES Usuarios(id) ON DELETE CASCADE,
    codigo VARCHAR(255) NOT NULL UNIQUE,
    tipo tipo_token NOT NULL,
    expiracion TIMESTAMP WITH TIME ZONE NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE TokensVerificacion IS 'Tokens para verificar email y resetear contraseña.';

-- Tabla: Aeropuertos
CREATE TABLE Aeropuertos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(3) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    terminales JSONB,
    
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE Aeropuertos IS 'Catálogo de aeropuertos para origen y destino.';

-- Tabla: Aerolineas
CREATE TABLE Aerolineas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(3) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    telefono_contacto VARCHAR(20),
    email_contacto VARCHAR(255),
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE Aerolineas IS 'Catálogo de aerolíneas operadoras.';

-- Tabla: Vuelos (Adaptado de Viajes)
CREATE TABLE Vuelos (
    id SERIAL PRIMARY KEY,
    aerolinea_id INTEGER NOT NULL REFERENCES Aerolineas(id) ON DELETE RESTRICT,
    aeropuerto_origen_id INTEGER NOT NULL REFERENCES Aeropuertos(id) ON DELETE RESTRICT,
    aeropuerto_destino_id INTEGER NOT NULL REFERENCES Aeropuertos(id) ON DELETE RESTRICT,
    
    numero_vuelo VARCHAR(10) UNIQUE NOT NULL,
    tipo_clase tipo_clase_vuelo NOT NULL DEFAULT 'Economica',
    
    fecha_salida TIMESTAMP WITH TIME ZONE NOT NULL,
    fecha_llegada TIMESTAMP WITH TIME ZONE NOT NULL,
    duracion_minutos INTEGER NOT NULL,
    
    precio_base DECIMAL(10, 2) NOT NULL,
    asientos_totales INTEGER NOT NULL,
    asientos_disponibles INTEGER NOT NULL,
    
    estado estado_vuelo NOT NULL DEFAULT 'Programado',
    puerta_embarque VARCHAR(10),
    
    -- Timestamps
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_fechas_vuelo CHECK (fecha_llegada > fecha_salida),
    CONSTRAINT chk_asientos_positivos CHECK (asientos_totales > 0 AND asientos_disponibles >= 0)
);
COMMENT ON TABLE Vuelos IS 'Catálogo principal de vuelos ofrecidos.';

-- Tabla: Asientos
CREATE TABLE Asientos (
    id SERIAL PRIMARY KEY,
    vuelo_id INTEGER NOT NULL REFERENCES Vuelos(id) ON DELETE CASCADE,
    numero_asiento VARCHAR(5) NOT NULL,
    tipo_clase tipo_clase_vuelo NOT NULL DEFAULT 'Economica',
    estado estado_asiento NOT NULL DEFAULT 'Disponible',
    precio_adicional DECIMAL(10, 2) DEFAULT 0.00,
    
    -- Timestamps
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(vuelo_id, numero_asiento)
);
COMMENT ON TABLE Asientos IS 'Configuración de asientos para cada vuelo.';


-- ---
-- 4. TABLAS TRANSACCIONALES (Reservas, Pagos, Promociones)
-- ---

-- Tabla: Promociones (Cubre RF08, RF13, RF22)
CREATE TABLE Promociones (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    porcentaje_descuento DECIMAL(5, 2) NOT NULL,
    fecha_inicio TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP WITH TIME ZONE NOT NULL,
    esta_activa BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Timestamps
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE Promociones IS 'Códigos de descuento para aplicar en los pagos.';

-- Tabla: Reservas (Resuelve M:N entre Usuarios y Vuelos)
CREATE TABLE Reservas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES Usuarios(id) ON DELETE CASCADE,
    vuelo_id INTEGER NOT NULL REFERENCES Vuelos(id) ON DELETE RESTRICT,
    
    codigo_reserva VARCHAR(10) UNIQUE NOT NULL,
    fecha_reserva TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    estado estado_reserva NOT NULL DEFAULT 'Pendiente',
    monto_total_calculado DECIMAL(10, 2) NOT NULL,
    
    -- Información de pasajeros
    pasajeros_json JSONB NOT NULL, -- Almacena array de pasajeros: [{nombre, apellido, tipo_pasajero, documento}]
    
    -- Timestamps
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE Reservas IS 'Reservas de vuelos por usuarios.';

-- Tabla: AsientosReservados (Tabla puente entre Reservas y Asientos)
CREATE TABLE AsientosReservados (
    id SERIAL PRIMARY KEY,
    reserva_id INTEGER NOT NULL REFERENCES Reservas(id) ON DELETE CASCADE,
    asiento_id INTEGER NOT NULL REFERENCES Asientos(id) ON DELETE RESTRICT,
    pasajero_index INTEGER NOT NULL, -- Índice del pasajero en el array pasajeros_json
    
    -- Timestamps
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(reserva_id, asiento_id),
    UNIQUE(asiento_id) -- Un asiento solo puede estar en una reserva
);
COMMENT ON TABLE AsientosReservados IS 'Relación entre reservas y asientos específicos.';

-- Tabla: Pagos (Cubre RF06, RF07, RF24, RF26)
CREATE TABLE Pagos (
    id SERIAL PRIMARY KEY,
    reserva_id INTEGER NOT NULL REFERENCES Reservas(id) ON DELETE RESTRICT,
    promocion_id INTEGER REFERENCES Promociones(id) ON DELETE SET NULL,
    
    monto DECIMAL(10, 2) NOT NULL,
    monto_descuento DECIMAL(10, 2) DEFAULT 0.00,
    monto_final DECIMAL(10, 2) NOT NULL,
    
    metodo_pago tipo_metodo_pago NOT NULL,
    estado estado_pago NOT NULL DEFAULT 'Pendiente',
    
    tipo_comprobante tipo_comprobante_fiscal NOT NULL DEFAULT 'Boleta',
    
    fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    id_transaccion_externa VARCHAR(255),
    motivo_fallido TEXT,
    
    -- Timestamps
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE Pagos IS 'Registros de transacciones para las reservas de vuelos.';


-- ---
-- 5. TABLAS COMPLEMENTARIAS (Reembolsos, Comentarios, Quejas)
-- ---

-- Tabla: Reembolsos (Cubre RF16, RF17)
CREATE TABLE Reembolsos (
    id SERIAL PRIMARY KEY,
    pago_id INTEGER NOT NULL REFERENCES Pagos(id) ON DELETE RESTRICT,
    admin_id_gestiona INTEGER REFERENCES Usuarios(id) ON DELETE SET NULL,
    
    motivo TEXT NOT NULL,
    monto_reembolsado DECIMAL(10, 2) NOT NULL,
    estado estado_reembolso NOT NULL DEFAULT 'Pendiente',
    
    fecha_solicitud TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE Reembolsos IS 'Gestión de reembolsos por cancelaciones u otros motivos.';

-- Tabla: ComentariosValoraciones (Para feedback de vuelos)
CREATE TABLE ComentariosValoraciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES Usuarios(id) ON DELETE CASCADE,
    vuelo_id INTEGER NOT NULL REFERENCES Vuelos(id) ON DELETE CASCADE,
    
    comentario TEXT,
    valoracion INT NOT NULL CHECK (valoracion >= 1 AND valoracion <= 5),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Timestamps
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT uq_usuario_vuelo_comentario UNIQUE (usuario_id, vuelo_id)
);
COMMENT ON TABLE ComentariosValoraciones IS 'Comentarios y valoraciones sobre los vuelos.';

-- Tabla: QuejasReclamos (Cubre RF11, RF27)
CREATE TABLE QuejasReclamos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES Usuarios(id) ON DELETE CASCADE,
    reserva_id INTEGER REFERENCES Reservas(id) ON DELETE SET NULL,
    
    descripcion_problema TEXT NOT NULL,
    estado estado_reclamo NOT NULL DEFAULT 'Recibido',
    respuesta_admin TEXT,
    
    fecha_reclamo TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE QuejasReclamos IS 'Formulario de quejas y reclamos sobre vuelos o reservas.';

-- ---
-- 6. ÍNDICES (para optimizar consultas)
-- ---

-- Índices sobre claves foráneas (FKs)
CREATE INDEX idx_tokens_usuario_id ON TokensVerificacion(usuario_id);
CREATE INDEX idx_vuelos_aerolinea_id ON Vuelos(aerolinea_id);
CREATE INDEX idx_vuelos_origen_id ON Vuelos(aeropuerto_origen_id);
CREATE INDEX idx_vuelos_destino_id ON Vuelos(aeropuerto_destino_id);
CREATE INDEX idx_asientos_vuelo_id ON Asientos(vuelo_id);
CREATE INDEX idx_reservas_usuario_id ON Reservas(usuario_id);
CREATE INDEX idx_reservas_vuelo_id ON Reservas(vuelo_id);
CREATE INDEX idx_asientos_reservados_reserva_id ON AsientosReservados(reserva_id);
CREATE INDEX idx_asientos_reservados_asiento_id ON AsientosReservados(asiento_id);
CREATE INDEX idx_pagos_reserva_id ON Pagos(reserva_id);
CREATE INDEX idx_reembolsos_pago_id ON Reembolsos(pago_id);
CREATE INDEX idx_comentarios_usuario_id ON ComentariosValoraciones(usuario_id);
CREATE INDEX idx_comentarios_vuelo_id ON ComentariosValoraciones(vuelo_id);
CREATE INDEX idx_quejas_usuario_id ON QuejasReclamos(usuario_id);
CREATE INDEX idx_quejas_reserva_id ON QuejasReclamos(reserva_id);

-- Índices ADICIONALES para búsquedas comunes
CREATE INDEX idx_vuelos_fechas ON Vuelos(fecha_salida, fecha_llegada);
CREATE INDEX idx_vuelos_numero ON Vuelos(numero_vuelo);
CREATE INDEX idx_reservas_codigo ON Reservas(codigo_reserva);
CREATE INDEX idx_pagos_id_transaccion_externa ON Pagos(id_transaccion_externa);
CREATE INDEX idx_aeropuertos_codigo ON Aeropuertos(codigo);
CREATE INDEX idx_aerolineas_codigo ON Aerolineas(codigo);


-- ---
-- 7. FUNCIONES Y TRIGGERS (para automatización y consistencia)
-- ---

-- ---
-- A. Trigger para actualizar automáticamente 'fecha_actualizacion'
-- ---
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Asignar el trigger a todas las tablas que lo necesitan
CREATE TRIGGER set_timestamp_usuarios BEFORE UPDATE ON Usuarios FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_aeropuertos BEFORE UPDATE ON Aeropuertos FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_aerolineas BEFORE UPDATE ON Aerolineas FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_vuelos BEFORE UPDATE ON Vuelos FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_asientos BEFORE UPDATE ON Asientos FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_promociones BEFORE UPDATE ON Promociones FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_reservas BEFORE UPDATE ON Reservas FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_asientos_reservados BEFORE UPDATE ON AsientosReservados FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_pagos BEFORE UPDATE ON Pagos FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_reembolsos BEFORE UPDATE ON Reembolsos FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_comentarios BEFORE UPDATE ON ComentariosValoraciones FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_timestamp_quejas BEFORE UPDATE ON QuejasReclamos FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();


-- ---
-- B. Trigger para cambiar estado de Reserva basado en el Pago
-- ---
CREATE OR REPLACE FUNCTION trigger_confirmar_reserva()
RETURNS TRIGGER AS $$
BEGIN
  -- Si el pago se acaba de validar
  IF NEW.estado = 'Validado' AND (OLD.estado IS NULL OR OLD.estado != 'Validado') THEN
    UPDATE Reservas
    SET estado = 'Confirmada'
    WHERE id = NEW.reserva_id;
  END IF;
  
  -- Si el pago se marca como Reembolsado, cancelar la reserva
  IF NEW.estado = 'Reembolsado' AND (OLD.estado IS NULL OR OLD.estado != 'Reembolsado') THEN
    UPDATE Reservas
    SET estado = 'Cancelada'
    WHERE id = NEW.reserva_id AND estado = 'Confirmada';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_reserva_por_pago
AFTER INSERT OR UPDATE ON Pagos
FOR EACH ROW
EXECUTE FUNCTION trigger_confirmar_reserva();


-- ---
-- C. Trigger para controlar cupos y actualizar asientos disponibles
-- ---
CREATE OR REPLACE FUNCTION trigger_controlar_cupo_reserva()
RETURNS TRIGGER AS $$
BEGIN
  -- Si se inserta una nueva reserva confirmada
  IF NEW.estado = 'Confirmada' AND (OLD.estado IS NULL OR OLD.estado != 'Confirmada') THEN
    -- Actualizar asientos disponibles en el vuelo
    UPDATE Vuelos 
    SET asientos_disponibles = asientos_disponibles - (
      SELECT COUNT(*) FROM AsientosReservados WHERE reserva_id = NEW.id
    )
    WHERE id = NEW.vuelo_id;
  END IF;
  
  -- Si se cancela una reserva confirmada
  IF NEW.estado = 'Cancelada' AND OLD.estado = 'Confirmada' THEN
    -- Liberar asientos en el vuelo
    UPDATE Vuelos 
    SET asientos_disponibles = asientos_disponibles + (
      SELECT COUNT(*) FROM AsientosReservados WHERE reserva_id = NEW.id
    )
    WHERE id = NEW.vuelo_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_controlar_cupo_reserva
AFTER INSERT OR UPDATE ON Reservas
FOR EACH ROW
EXECUTE FUNCTION trigger_controlar_cupo_reserva();


-- ---
-- D. Trigger para actualizar estado de asientos al reservarlos
-- ---
CREATE OR REPLACE FUNCTION trigger_actualizar_estado_asiento()
RETURNS TRIGGER AS $$
BEGIN
  -- Al reservar un asiento, marcarlo como reservado
  UPDATE Asientos 
  SET estado = 'Reservado' 
  WHERE id = NEW.asiento_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_estado_asiento
AFTER INSERT ON AsientosReservados
FOR EACH ROW
EXECUTE FUNCTION trigger_actualizar_estado_asiento();


-- ---
-- 8. VISTAS ÚTILES
-- ---

-- Vista para información completa de vuelos
CREATE OR REPLACE VIEW VistaVuelosCompletos AS
SELECT 
    v.id,
    v.numero_vuelo,
    a.nombre as aerolinea,
    ao.codigo as origen_codigo,
    ao.ciudad as origen_ciudad,
    ad.codigo as destino_codigo, 
    ad.ciudad as destino_ciudad,
    v.fecha_salida,
    v.fecha_llegada,
    v.tipo_clase,
    v.precio_base,
    v.asientos_disponibles,
    v.estado
FROM Vuelos v
JOIN Aerolineas a ON v.aerolinea_id = a.id
JOIN Aeropuertos ao ON v.aeropuerto_origen_id = ao.id
JOIN Aeropuertos ad ON v.aeropuerto_destino_id = ad.id;

-- Vista para reservas con información completa
CREATE OR REPLACE VIEW VistaReservasCompletas AS
SELECT 
    r.id,
    r.codigo_reserva,
    u.nombre || ' ' || u.apellido as cliente,
    v.numero_vuelo,
    r.estado as estado_reserva,
    r.monto_total_calculado,
    r.fecha_reserva
FROM Reservas r
JOIN Usuarios u ON r.usuario_id = u.id
JOIN Vuelos v ON r.vuelo_id = v.id;