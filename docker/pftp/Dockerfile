FROM node:16-alpine AS frontend-builder

WORKDIR /frontend

COPY ["web/package.json", "web/package-lock.json*", "web/yarn.lock", "./"] 

RUN yarn install

COPY web/ .

RUN CI=false npm run build

FROM node:16.17-alpine3.15 AS backend-builder

WORKDIR /backend

COPY ["server/package.json", "server/package-lock.json*", "./"]

COPY server/ .

RUN npm install 

RUN npm run build && rm -fr src

FROM node:16.17-alpine3.15

LABEL maintainer="ATPlust Digital"

ENV API_LISTEN_PORT=3000 SERVER_PORT=80

WORKDIR /app

COPY docker/pftp/docker-entrypoint.sh /docker-entrypoint.sh

COPY docker/pftp/20-envsubst-on-templates.sh /docker-entrypoint.d/20-envsubst-on-templates.sh

RUN chmod +x /docker-entrypoint.sh && chmod +x /docker-entrypoint.d/20-envsubst-on-templates.sh

RUN apk update && apk upgrade && apk add --no-cache --virtual .gettext gettext nginx 

COPY docker/pftp/nginx.conf /etc/nginx/nginx.conf

COPY  docker/pftp/templates /etc/nginx/templates

COPY --from=frontend-builder ./frontend/build /app/frontend

COPY --from=backend-builder ./backend/ /app/backend

EXPOSE $PORT

ENTRYPOINT [ "/docker-entrypoint.sh"]

STOPSIGNAL SIGILL

CMD ["node", "backend/build/index.js"]
