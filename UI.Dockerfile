FROM node:18.12.1
ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python
COPY ./yarn.lock .
COPY ./ui/package.json .
RUN yarn install --frozen-lockfile

# Bundle app source
COPY ./ui .

ENV NODE_ENV production
RUN yarn run build
EXPOSE 3000

CMD [ "yarn", "start" ]
