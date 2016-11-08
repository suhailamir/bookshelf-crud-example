FROM mhart/alpine-node:6

COPY ./app /app
WORKDIR /app
# RUN npm prune
# RUN npm install

EXPOSE 3000
CMD npm run start
