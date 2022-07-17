FROM node:14.18
ENV PORT 4000

# RUN mkdir -p /usr/src/app/data-service
WORKDIR /usr/src/app/ds

COPY ./yarn.lock ./
COPY ./ds/package*.json ./
RUN yarn install --frozen-lockfile

COPY ./ds .
ENV NODE_ENV production
RUN yarn run build

CMD ["yarn", "start"]
EXPOSE 4000
