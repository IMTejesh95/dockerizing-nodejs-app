FROM alpine

LABEL maintainer="chauragade.tejesh@gmail.com"

RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["start"]