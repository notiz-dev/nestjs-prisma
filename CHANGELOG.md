# Not released

### Added 

- add `providePrismaClientExceptionFilter`, improve exception filter docs

### Changed

- remove deprecated `Prisma.NotFoundError` as it is replaced by `Prisma.PrismaClientKnownRequestError`

# [0.20.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.19.0...v0.20.0) (2023-01-16)

### Added

- simplify error handling flow ([#39](https://github.com/notiz-dev/nestjs-prisma/pull/39))
- support custom location/multiple Prisma Clients and extensions preview

# [0.19.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.18.0...v0.19.0) (2022-10-14)

### Added

- catch `Prisma.NotFoundError` of `findFirstOrThrow` and `findUniqueOrThrow` with `PrismaClientExceptionFilter`

### Fixed

- fix: shutdownHooks in microservice context ([#32](https://github.com/notiz-dev/nestjs-prisma/issues/32))


# [0.18.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.17.0...v0.18.0) (2022-08-18)

### Added

- add logging middleware
- extending prisma client for proper logging options

### Changed

- support graphql with the exception filter

# [0.17.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.16.0...v0.17.0) (2022-07-26)

### Added

- add support for prisma v4
- add support for nest v9

# [0.16.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.15.1...v0.16.0) (2022-06-08)

### Features

* exception filter: custom error code mapping ([#21](https://github.com/notiz-dev/nestjs-prisma/issues/21)) ([6b36d6b](https://github.com/notiz-dev/nestjs-prisma/commit/6b36d6b8815c3fa959989f9ca423abe60f743a1d))

### Bug Fixes

* exception filter: compatible with FastifyAdapter ([#21](https://github.com/notiz-dev/nestjs-prisma/issues/21)) ([6b36d6b](https://github.com/notiz-dev/nestjs-prisma/commit/6b36d6b8815c3fa959989f9ca423abe60f743a1d))
* readme typos ([#19](https://github.com/notiz-dev/nestjs-prisma/issues/19)) ([d7fab47](https://github.com/notiz-dev/nestjs-prisma/commit/d7fab4756ece32bdad20dd4674bd57f33ef1c834))



## [0.15.1](https://github.com/notiz-dev/nestjs-prisma/compare/v0.15.0...v0.15.1) (2022-01-19)

### Bug Fixes

- **schematics**: remove `--preview-feature` flag for `prisma migrate db seed` command


# [0.15.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.15.0-dev.2...v0.15.0) (2022-01-16)

## Features

- **lib**: add shutdown hook, close #16
- **lib**: add middlewares option to prisma module, close #15


## [0.14.3](https://github.com/notiz-dev/nestjs-prisma/compare/v0.14.2...v0.14.3) (2021-11-02)

### Bug Fixes

* **exception-filter:** unmask prisma client not generated error ([#13](https://github.com/notiz-dev/nestjs-prisma/pull/13))

## [0.14.2](https://github.com/notiz-dev/nestjs-prisma/compare/v0.14.1...v0.14.2) (2021-10-21)

### Bug Fixes

* **docker-compose:** fix depends on for postgres ([#12](https://github.com/notiz-dev/nestjs-prisma/pull/12)) and mysql db ([365a832](https://github.com/notiz-dev/nestjs-prisma/commit/365a832fcfdb642977a40f519347353ff8fae3e7))


## [0.14.1](https://github.com/notiz-dev/nestjs-prisma/compare/v0.14.0...v0.14.1) (2021-10-08)


### Bug Fixes

* **schematics:** change id to $id ([aabcd12](https://github.com/notiz-dev/nestjs-prisma/commit/aabcd124de6c42b7b8168e1e4c352da686c03532))



# [0.14.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.13.2...v0.14.0) (2021-10-08)


### Features

* **docker:** add mysql support, close [#11](https://github.com/notiz-dev/nestjs-prisma/issues/11) ([b41785b](https://github.com/notiz-dev/nestjs-prisma/commit/b41785b45a68db825de2cae4647d5bb53038c8f6))
* **schematics:** prompt datasource provider then add docker during add ([68ee05a](https://github.com/notiz-dev/nestjs-prisma/commit/68ee05a6535258ce9d470c745850966f7278fddb))
* **seed:** add seed script to package.json, close [#10](https://github.com/notiz-dev/nestjs-prisma/issues/10) ([98dc350](https://github.com/notiz-dev/nestjs-prisma/commit/98dc350b18469402c3b9c08b06f80029445d326e))



## [0.13.2](https://github.com/notiz-dev/nestjs-prisma/compare/v0.13.1...v0.13.2) (2021-09-20)

### Chore

* **prisma**: add `prisma@^3.0.0` to peer dependencies



## [0.13.1](https://github.com/notiz-dev/nestjs-prisma/compare/v0.13.0...v0.13.1) (2021-08-27)


### Features

* **schematics:** add mongodb as datasource provider ([bd31f4f](https://github.com/notiz-dev/nestjs-prisma/commit/bd31f4fdbd59cb958c876c4db6e9ff26d402913b))



# [0.13.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.12.0...v0.13.0) (2021-08-17)


### Bug Fixes

* change master to main ([a35d5e3](https://github.com/notiz-dev/nestjs-prisma/commit/a35d5e33117cbdac852b7a2394620714a1742ec8))


### Features

* **nestjs**: adds support for nestjs 8.x.x ([96b0748](https://github.com/notiz-dev/nestjs-prisma/commit/96b07481c2e8b12edf751b4d18222a14f310cc56))
* **exception-filter:** new prisma client exception filter ([fbcef2d](https://github.com/notiz-dev/nestjs-prisma/commit/fbcef2d3a2a1a7c8fda78bf92a9801144179a594))



# [0.12.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.11.0...v0.12.0) (2021-07-01)


### Bug Fixes

* **prisma-service:** init options as empty object ([ec4d097](https://github.com/notiz-dev/nestjs-prisma/commit/ec4d0978796ac52fadce404433acdcd62e5257ae))


### Features

* **datasource:** pass datasource to prisma init ([9cdd23e](https://github.com/notiz-dev/nestjs-prisma/commit/9cdd23e7f8a66a66e212f0e99d9f27b19c81bad0))
* **deps:** fetch deps version before installing ([a92c7b2](https://github.com/notiz-dev/nestjs-prisma/commit/a92c7b27eceb61089eb67992fbd6e2d9428318b2))
* **docker-compose:** add restart policy to nest service ([99b74b7](https://github.com/notiz-dev/nestjs-prisma/commit/99b74b7ba5a44cdce875b1334e109e5437b8b12c))
* **prisma:** pass options directly to prisma client ([ffe0526](https://github.com/notiz-dev/nestjs-prisma/commit/ffe0526d87e7d0b6048fe35f4352c5c65bde14c5))
* **schematics:** add .dockerignore ([a827348](https://github.com/notiz-dev/nestjs-prisma/commit/a827348362a2f64fa0ad2b3a0562175d29a53e51))



# [0.11.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.10.0...v0.11.0) (2021-04-06)


### Features

* **tsconfig:** exclude prisma folder from build ([ee6735c](https://github.com/notiz-dev/nestjs-prisma/commit/ee6735c3e4bb99f17866b2e69331efa5eb7036a0))



# [0.10.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.8.0...v0.10.0) (2021-04-06)


### Features

* **docker:** set node image version to 14 ([f188a57](https://github.com/notiz-dev/nestjs-prisma/commit/f188a576e4e2061cb9599edba0ae60617e8c2388))
* **docker:** update postgres to v13 ([abdb99a](https://github.com/notiz-dev/nestjs-prisma/commit/abdb99af14f0c554f7299631780769f62fbfb3f2))
* **migrate:** remove preview-feature flag from migrate ([7d139ee](https://github.com/notiz-dev/nestjs-prisma/commit/7d139ee288d657830c6e8934947f251dc1593468))
* **prisma:** replace @prisma/cli with prisma ([de1b106](https://github.com/notiz-dev/nestjs-prisma/commit/de1b10619dd06362f4752490ed141a71bc0ed1ba))



# [0.9.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.8.0...v0.9.0) (2021-02-09)


### Features

* **docker:** update postgres to v13 ([abdb99a](https://github.com/notiz-dev/nestjs-prisma/commit/abdb99af14f0c554f7299631780769f62fbfb3f2))
* **prisma:** replace @prisma/cli with prisma ([de1b106](https://github.com/notiz-dev/nestjs-prisma/commit/de1b10619dd06362f4752490ed141a71bc0ed1ba))



# [0.8.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.7.0...v0.8.0) (2020-12-13)


### Features

* **migrate:** update to new prisma migrate commands ([94c6aae](https://github.com/notiz-dev/nestjs-prisma/commit/94c6aaef878899f017abda6a14f000ac41c9c5be))
* **prisma:** bump prisma peerDeps to prisma@2.13 ([863fa7e](https://github.com/notiz-dev/nestjs-prisma/commit/863fa7e6694cd8e4154b664e22657ba534d782f3))



# [0.7.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.6.1...v0.7.0) (2020-09-17)


### Bug Fixes

* **docker:** env file for postgres ([5cec264](https://github.com/notiz-dev/nestjs-prisma/commit/5cec26460fb1ee2cdbbc801bf518e4c9f611b31b))


### Features

* **prisma-studio:** remove --experimental in 2.7.0 ([13b19a1](https://github.com/notiz-dev/nestjs-prisma/commit/13b19a1311b1488eff2441ebd8566a1bae039be7))



## [0.6.1](https://github.com/notiz-dev/nestjs-prisma/compare/v0.6.0...v0.6.1) (2020-09-08)


### Bug Fixes

* **prisma:** remove user model, popullated in the lib ([eccdaa9](https://github.com/notiz-dev/nestjs-prisma/commit/eccdaa9cfa6dd93f38629ec4786a7f1f01ab5e67))



# [0.6.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.6.0-dev.2...v0.6.0) (2020-09-08)


### Features

* **schematics:** prompt to dockerize app ([#4](https://github.com/notiz-dev/nestjs-prisma/issues/4)) ([f79f933](https://github.com/notiz-dev/nestjs-prisma/commit/f79f933f3406a6f3e1157551246dc2dc6253350b))



# [0.6.0-dev.2](https://github.com/notiz-dev/nestjs-prisma/compare/v0.5.0...v0.6.0-dev.2) (2020-09-01)


### Features

* **lib:** add prisma service and module as lib, closes [#2](https://github.com/notiz-dev/nestjs-prisma/issues/2) ([3cc71d0](https://github.com/notiz-dev/nestjs-prisma/commit/3cc71d054e0546cdd913a0358e977c6dc05a19fc))
* **lib:** add repo link and bug link for npm ([fd09f7e](https://github.com/notiz-dev/nestjs-prisma/commit/fd09f7e546da3905b0120705235f555965184948))
* **schematics:** prompt user to generate prisma service ([2e4e72a](https://github.com/notiz-dev/nestjs-prisma/commit/2e4e72a7269b6aff45a25930b921ea7e1e40ef25))



## [0.5.1](https://github.com/notiz-dev/nestjs-prisma/compare/v0.5.0...v0.5.1) (2020-08-27)


### Features

* **lib:** add repo link and bug link for npm ([fd09f7e](https://github.com/notiz-dev/nestjs-prisma/commit/fd09f7e546da3905b0120705235f555965184948))



# [0.5.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.4.0...v0.5.0) (2020-08-27)


### Features

* **prisma:** add prisma module ([449203a](https://github.com/notiz-dev/nestjs-prisma/commit/449203a1d6a407834bec186ab0b04026a373d6fd))



# [0.4.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.3.0...v0.4.0) (2020-08-27)


### Features

* **prisma:** change prismaVersion to `latest` ([301813b](https://github.com/notiz-dev/nestjs-prisma/commit/301813b04e8a40d9b0569c9aaffcb0e678a0e64f))
* **schematics:** save to devDeps ([1215f21](https://github.com/notiz-dev/nestjs-prisma/commit/1215f21f3fa165da9b037bd5ebe1d6b43bef5f74))



# [0.3.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.1.1...v0.3.0) (2020-08-17)


### Features

* **prisma:** add $ for top level methods ([b566c8f](https://github.com/notiz-dev/nestjs-prisma/commit/b566c8f61426e5011f9e3f2e9783618739325207))
* **prisma:** add npx prisma init command ([f88d36d](https://github.com/notiz-dev/nestjs-prisma/commit/f88d36da5c3d633f176728560afed8d62f449d8c))



# [0.2.0](https://github.com/notiz-dev/nestjs-prisma/compare/v0.1.1...v0.2.0) (2020-08-07)


### Features

* **prisma:** add $ for top level methods ([b566c8f](https://github.com/notiz-dev/nestjs-prisma/commit/b566c8f61426e5011f9e3f2e9783618739325207))



## 0.1.1 (2020-08-06)


### Features

* **prisma:** add npm scripts, prisma service and docker option ([9ff09a7](https://github.com/notiz-dev/nestjs-prisma/commit/9ff09a72f709a70873962dd5009a9c3c5b3adf16))
* **prisma:** add prisma cli and client dependencies ([ddf01fe](https://github.com/notiz-dev/nestjs-prisma/commit/ddf01fea6fa95bda07416553f922b1f2136affe7))



