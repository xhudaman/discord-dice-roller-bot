# syntax=docker/dockerfile:experimental

FROM node:15.3.0-alpine3.12 AS base

ENV YARN_CACHE_FOLDER=/cache/yarn

WORKDIR /src

FROM base AS test

ENV NODE_ENV=development
ENV NODE_OPTIONS=--experimental-vm-modules

COPY . .

RUN \
  --mount=id=yarn-cache,type=cache,target=/cache/yarn \
  --mount=id=node_modules,type=cache,target=/src/node_modules \
  yarn ci

FROM base AS build

ENV NODE_ENV=production

COPY --from=test . .

RUN \
  --mount=id=yarn-cache,type=cache,target=/cache/yarn \
  yarn install --frozen-lockfile --non-interactive --production=true

FROM node:15.3.0-alpine3.12

ARG DISCORD_CLIENT_AUTH_TOKEN

ENV DISCORD_CLIENT_AUTH_TOKEN=${DISCORD_CLIENT_AUTH_TOKEN}
ENV NODE_ENV=production

COPY --from=build . .

CMD ["node", "index.mjs"]
