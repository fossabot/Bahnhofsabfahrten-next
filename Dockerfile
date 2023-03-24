FROM node:alpine

WORKDIR /app

COPY package.json ./
RUN apk --update add tzdata && cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && apk del tzdata
ENV TZ=Europe/Berlin
RUN yarn install --production

COPY . .

RUN yarn run next build

EXPOSE 3000

CMD ["yarn", "start"]
