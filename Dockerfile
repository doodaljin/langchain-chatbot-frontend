FROM node:20.5-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

WORKDIR /opt
COPY package.json yarn.lock ./
RUN yarn config set network-timeout 600000 -g && yarn install

WORKDIR /opt/app
COPY . .
ENV PATH /opt/node_modules/.bin:$PATH
RUN chown -R node:node /opt/app
USER node
EXPOSE 3000
CMD ["yarn", "dev"]