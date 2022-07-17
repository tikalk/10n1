FROM node:14.18
ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./yarn.lock .
COPY ./ui/package*.json .
RUN yarn install --frozen-lockfile

# Bundle app source
COPY ./ui .

ENV NODE_ENV production
RUN yarn run build
EXPOSE 3000

CMD [ "yarn", "start" ]
