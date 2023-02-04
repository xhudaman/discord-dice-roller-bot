# syntax=docker/dockerfile:experimental

FROM node:lts-alpine AS base

ENV YARN_CACHE_FOLDER=/cache/yarn

WORKDIR /src

RUN npm i -g pnpm

FROM base AS test

ENV NODE_ENV=development

COPY . .

RUN pnpm ci

FROM base AS build

ENV NODE_ENV=production

COPY --from=test . .

RUN pnpm i --frozen-lockfile --prod

FROM node:lts-alpine

ARG DISCORD_CLIENT_AUTH_TOKEN

ENV DISCORD_CLIENT_AUTH_TOKEN=${DISCORD_CLIENT_AUTH_TOKEN}
ENV NODE_ENV=production

COPY --from=build . .

CMD ["node", "index.mjs"]
