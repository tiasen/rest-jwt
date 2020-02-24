FROM node:10.19.0-jessie

WORKDIR /app

COPY . /app

ENV DB_HOST=${DB_HOST} DB_PORT=${DB_PORT} DB_USERNAME=${DB_USERNAME} DB_PASSWORD=${DB_PASSWORD} DB_DATABASE=${DB_DATABASE}

RUN yarn && yarn build

EXPOSE ${EXPRESS_PORT}

CMD ["node", "dist/main.js"]