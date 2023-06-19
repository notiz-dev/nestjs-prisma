---
title: Installation
---

## Automatic Install

Use the [nest add](/docs/schematics) command to automatically setup the library, Prisma and Docker (optionally):

```sh
nest add nestjs-prisma
```

## Manual Install

Add `nestjs-prisma` library to your [NestJS application](https://docs.nestjs.com/#installation):

```sh
# npm
npm install nestjs-prisma

# yarn
yarn add nestjs-prisma
```

Furthermore, setup [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres#set-up-prisma) in your NestJS application, if you haven't already.

```sh
npm i -D prisma
npm install @prisma/client

npx prisma init
```
