FROM node:8

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN npm install pm2 -g

# some bash niceties
ADD .docker/root/.bashrc /root/

COPY package.json $APP_HOME

RUN npm install | cat

COPY . .

EXPOSE 8750
# CMD ["npm", "start"]
CMD ["pm2-dev", "process.json"]
