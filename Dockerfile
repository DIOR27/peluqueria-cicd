# Etapa de build
FROM node:20 AS build

WORKDIR /app
COPY dpelos-client/ /app/
RUN npm install && npm run build

# Etapa de producción con NGINX
FROM nginx:alpine

# Copiar el build de React a la ruta pública de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer puerto 80 (por defecto NGINX sirve en 80)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
