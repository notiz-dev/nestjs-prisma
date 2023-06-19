---
title: Schematics
---

## Command

The [schematics command](https://docs.nestjs.com/cli/usages#nest-add) automatically performs [additional steps](https://github.com/notiz-dev/nestjs-prisma/blob/main/schematics/nestjs-prisma/index.ts#L35-L42) to configure Prisma and Docker in your project.

- Initialize Prisma `npx prisma init --datasource-provider postgres|...`
- Add Prisma npm scripts to your `package.json`
- Add seed script for Prisma
- Generate custom `PrismaService` and `PrismaModule` (optionally)
- Add `Dockerfile` and `docker-compose.yml` (optionally)
- Excludes `prisma` directory from build via `tsconfig.build.json`

Example output of the schematics:

```bash
✔ Package installation in progress... ☕
Starting library setup...
? Which datasource provider do you want to use for `prisma init`? postgresql
? Do you like to Dockerize your application? (Supports postgresql and mysql) Yes
    ✅️ Added prisma@latest
    ✅️ Added @prisma/client@latest
    ✅️ Added Prisma scripts [6]
    ✅️ Added Prisma Seed script
    ✅️ Added Docker file
    ✅️ Added Docker Compose and .env
    ✅️ Add "prisma" directory to "excludes" in tsconfig.build.json
CREATE .dockerignore (42 bytes)
CREATE Dockerfile (455 bytes)
CREATE .env (642 bytes)
CREATE docker-compose.yml (497 bytes)
UPDATE package.json (2754 bytes)
UPDATE tsconfig.build.json (130 bytes)
✔ Packages installed successfully.
✔ Packages installed successfully.
    ✅️ Initialized Prisma - Datasource postgresql
```

## Options

All available options to passe to the schematic command:

| Flag                     | Description                                                             | Type      | Default  |
| ------------------------ | ----------------------------------------------------------------------- | --------- | -------- |
| `datasourceProvider`     | Specifies the datasource provider for prisma init and docker.           | `boolean` | Prompted |
| `addDocker`              | Create a Dockerfile and docker-compose.yaml.                            | `boolean` | Prompted |
| `addPrismaService`       | Create a Prisma service extending the Prisma Client and module.         | `boolean` | `false`  |
| `dockerNodeImageVersion` | Node version for the builder and runner image.                          | `string`  | `14`     |
| `name`                   | The name for the Prisma service extending the Prisma Client and module. | `string`  | `Prisma` |
| `prismaVersion`          | The Prisma version to be installed.                                     | `string`  | `latest` |
| `skipInstall`            | Skip installing dependency packages.                                    | `boolean` | `false`  |
| `skipPrismaInit`         | Skip initializing Prisma.                                               | `boolean` | `false`  |

You can pass additional flags to customize the schematic. For example, if you want to install a different version for **Prisma** use `--prismaVersion` flag:

```bash
nest add nestjs-prisma --prismaVersion 3.2.1
```

If you want to skip installing dependencies use `--skipInstall` flag:

```bash
nest add nestjs-prisma --skipInstall
```

Add `Dockerfile` and `docker-compose.yaml`, you can even use a different `node` version (`14-alpine` or `16`).

Currently uses **PostgreSQL** as a default database in `docker-compose.yaml`.

```bash
nest add nestjs-prisma --addDocker --dockerNodeImageVersion 14-alpine
```
