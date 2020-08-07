# NestJS Prisma Schematics

Add [Prisma](https://github.com/prisma/prisma) support to your [NestJS](https://github.com/nestjs/nest) application.

## Installation

```bash
nest add nestjs-prisma

# initialize prisma
npx prisma init
```

Example output

```bash
▹▹▹▹▸ Package installation in progress... ☕
Starting library setup...
CREATE src/prisma/prisma.service.spec.ts (460 bytes)
CREATE src/prisma/prisma.service.ts (387 bytes)
UPDATE package.json (2260 bytes)
✔ Packages installed successfully.
```

## Additional options

You can pass additional flags to customize the schematic. For example, if you want to install a different version for **Prisma** use `--prismaVersion` flag:

```bash
nest add nestjs-prisma --prismaVersion 2.4.1
```

If you want to skip installing dependencies use `--skipInstall` flag:

```bash
nest add nestjs-prisma --skipInstall
```

Add `Dockerfile` and `docker-compose.yaml`, you can even use a different `node` version (`12-alpine` or `14`).

> Currently uses to **PostgreSQL** as a default database in `docker-compose.yaml`.

```bash
nest add nestjs-prisma --addDocker --dockerNodeImageVersion 12-alpine
```

All available flags:

| Flag                      |  Description                                   | Type      |  Default                                                     |
| ------------------------- | ---------------------------------------------- | --------- | ------------------------------------------------------------ |
|  `addDocker`              | Create a Dockerfile and docker-compose.yaml.   | `boolean` |  `false`                                                     |
|  `dockerNodeImageVersion` | Node version for the builder and runner image. | `string`  | `12`                                                         |
|  `prismaVersion`          | The Prisma version to be installed.            | `string`  | [2.4.0](https://github.com/prisma/prisma/releases/tag/2.4.0) |
|  `skipInstall`            | Skip installing dependency packages.           | `boolean` | `false`                                                      |
|  `skipPrismaInit`         | Skip initializing Prisma.                      | `boolean` | `false`                                                      |

## Developing

Install `@angular-devkit/schematics-cli` to be able to use `schematics` command

```bash
npm i -g @angular-devkit/schematics-cli
```

Now build the schematics and run the schematic.

```bash
npm run build
# or
npm run build:watch

# dry-run
schematics .:nest-add

# execute schematics
schematics .:nest-add --debug false
# or
schematics .:nest-add --dry-run false
```

## Helpful

Helpful article about [Custom Angular Schematics](https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4) which also applies to Nest.
