FROM node:16-alpine

WORKDIR /app


COPY ["web/package.json", "web/package-lock.json*", "web/yarn.lock", "./"] .

RUN yarn install

COPY web/ .

RUN CI=false npm run build


FROM nginx:alpine

WORKDIR /app

COPY --from=0 ./app/build /app


COPY  docker/nginx/templates /etc/nginx/templates

