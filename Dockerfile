FROM node:lts

WORKDIR /usr/src/app

ARG CACHEBUST=1

COPY . .

RUN npm install

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "run", "api"]