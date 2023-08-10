FROM node:20

WORKDIR /app 


COPY ./app .

RUN npm install --force

RUN npm run build

CMD ["bash"]
