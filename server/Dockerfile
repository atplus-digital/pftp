FROM node:16.17-alpine3.15

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY . .

RUN npm install 

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
