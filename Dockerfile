FROM node:alpine

WORKDIR /app

COPY package.json ./
RUN apk update && apk upgrade &&  apk add ca-certificates && update-ca-certificates && apk add --update tzdata
ENV TZ=Europe/Berlin
# Clean APK cache
RUN yarn install --production

COPY . .
RUN yarn run next build

EXPOSE 3000

CMD ["yarn", "start"]
