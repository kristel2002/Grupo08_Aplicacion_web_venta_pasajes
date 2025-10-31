-- database/seed.sql

-- Insertar aeropuertos
INSERT INTO Aeropuertos (codigo, nombre, ciudad, pais) VALUES
('LIM', 'Aeropuerto Internacional Jorge Chávez', 'Lima', 'Perú'),
('CUZ', 'Aeropuerto Internacional Alejandro Velasco Astete', 'Cusco', 'Perú'),
('AQP', 'Aeropuerto Internacional Rodríguez Ballón', 'Arequipa', 'Perú'),
('TRU', 'Aeropuerto Internacional Capitán FAP Carlos Martínez de Pinillos', 'Trujillo', 'Perú'),
('IQT', 'Aeropuerto Internacional Coronel FAP Francisco Secada Vignetta', 'Iquitos', 'Perú')
ON CONFLICT (codigo) DO NOTHING;

-- Insertar aerolíneas
INSERT INTO Aerolineas (codigo, nombre, telefono_contacto, email_contacto) VALUES
('LA', 'LATAM Airlines', '+51-1-213-8300', 'contacto@latam.com'),
('AV', 'Avianca', '+51-1-511-8222', 'servicio@avianca.com'),
('JA', 'JetSmart Airlines', '+56-2-2953-3420', 'contact@jetsmart.com')
ON CONFLICT (codigo) DO NOTHING;

-- Insertar usuarios de prueba
INSERT INTO Usuarios (nombre, apellido, telefono, documento_identidad, email, password_hash, rol, esta_verificado) VALUES
('Juan', 'Pérez', '+51-987-654-321', '12345678', 'juan@example.com', '$2a$10$ExampleHash', 'Cliente', true),
('María', 'Gómez', '+51-987-654-322', '87654321', 'maria@example.com', '$2a$10$ExampleHash', 'Cliente', true),
('Admin', 'Sistema', '+51-1-234-5678', '00112233', 'admin@tourest.com', '$2a$10$ExampleHash', 'Administrador', true)
ON CONFLICT (email) DO NOTHING;

-- Insertar vuelos de prueba
INSERT INTO Vuelos (aerolinea_id, aeropuerto_origen_id, aeropuerto_destino_id, numero_vuelo, tipo_clase, fecha_salida, fecha_llegada, duracion_minutos, precio_base, asientos_totales, asientos_disponibles, estado) VALUES
(1, 1, 2, 'LA2025', 'Economica', '2024-12-01 08:00:00-05', '2024-12-01 09:30:00-05', 90, 250.00, 180, 180, 'Programado'),
(1, 1, 2, 'LA2026', 'Ejecutiva', '2024-12-01 14:00:00-05', '2024-12-01 15:30:00-05', 90, 450.00, 24, 24, 'Programado'),
(2, 2, 1, 'AV3015', 'Economica', '2024-12-02 10:00:00-05', '2024-12-02 11:30:00-05', 90, 280.00, 160, 160, 'Programado'),
(1, 1, 3, 'LA2040', 'Economica', '2024-12-01 16:00:00-05', '2024-12-01 17:15:00-05', 75, 180.00, 180, 180, 'Programado')
ON CONFLICT (numero_vuelo) DO NOTHING;

-- Insertar asientos para los vuelos
INSERT INTO Asientos (vuelo_id, numero_asiento, tipo_clase, estado, precio_adicional)
SELECT 
  v.id as vuelo_id,
  CONCAT( 
    CASE 
      WHEN s.row_num <= 6 THEN 'EJ' 
      ELSE 'EC' 
    END,
    s.row_num,
    CASE 
      WHEN s.seat_letter = 'A' THEN 'V' 
      WHEN s.seat_letter = 'B' THEN 'C' 
      WHEN s.seat_letter = 'C' THEN 'P' 
      ELSE 'V' 
    END
  ) as numero_asiento,
  CASE 
    WHEN s.row_num <= 6 THEN 'Ejecutiva'::tipo_clase_vuelo 
    ELSE 'Economica'::tipo_clase_vuelo 
  END as tipo_clase,
  'Disponible'::estado_asiento as estado,
  CASE 
    WHEN s.row_num <= 6 THEN 200.00 
    ELSE 0.00 
  END as precio_adicional
FROM Vuelos v
CROSS JOIN generate_series(1, 30) as s(row_num)
CROSS JOIN (VALUES ('A'), ('B'), ('C')) as letters(seat_letter)
WHERE v.numero_vuelo IN ('LA2025', 'LA2026', 'AV3015', 'LA2040');

-- Insertar promociones
INSERT INTO Promociones (codigo, descripcion, porcentaje_descuento, fecha_inicio, fecha_fin, esta_activa) VALUES
('VERANO2024', 'Descuento especial de verano', 15.00, '2024-01-01 00:00:00-05', '2024-12-31 23:59:59-05', true),
('PRIMERVUELO', 'Descuento para primer vuelo', 10.00, '2024-01-01 00:00:00-05', '2024-12-31 23:59:59-05', true)
ON CONFLICT (codigo) DO NOTHING;