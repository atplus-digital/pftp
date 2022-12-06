FROM node:16.17-alpine3.15

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

RUN npm run build


FROM node:16.17-alpine3.15

WORKDIR /app

COPY --from=0 ./app/build /app

EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
