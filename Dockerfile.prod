FROM node:11.7.0-alpine

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN apk add --no-cache bash
RUN npm install pm2 -g

# some bash niceties
ADD .docker/root/.bashrc /root/

COPY package.json $APP_HOME

RUN npm install

COPY . .

ENTRYPOINT ["pm2-dev"]
CMD ["process.json"]
