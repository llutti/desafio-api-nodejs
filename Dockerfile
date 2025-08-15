FROM node:22-alpine AS builder

WORKDIR /app

COPY . ./

RUN npm CI

EXPOSE 7001

CMD ["npm", "run", "start"]
