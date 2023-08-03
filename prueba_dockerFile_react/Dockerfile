FROM node:alpine

#Ruta que tendrá nuestro contenedor
WORKDIR /app 
#Copia en el contenedor todos los archivos que comiencen con package* y terminen con .json
COPY package*.json .

RUN npm install --force

#El primer punto indica que se copiara todo lo que hay en nuestra ruta
#El segundo punto indica que lo anterior, será almacenado en la ruta /app
COPY . . 

RUN npm run build

#Puerto del contenedor
EXPOSE 8001

#Ejecutamos el comando del modo desarrollador 
CMD ["npm","run","dev"]