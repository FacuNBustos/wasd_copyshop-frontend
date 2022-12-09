FROM node:16-alpine

WORKDIR /reactapp

EXPOSE 3000

COPY package.json ./

RUN yarn install --force --silent

COPY . ./

RUN yarn build

CMD ["yarn", "preview"]
