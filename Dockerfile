# Dockerfile (en la raíz del proyecto)
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para desarrollo (con hot-reload)
CMD ["npm", "start"]