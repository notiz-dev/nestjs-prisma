# NestJS Prisma Schematics

Add [Prisma](https://github.com/prisma/prisma) support to your NestJS application.

## Installation

```bash
nest add nestjs-prisma
```

Example output

```bash
...
UPDATE package.json  ...
```

## Additional options

You can pass additional flags to customize the schematic. For example, if you want to install a different version for **Prisma** use `--prismaVersion` flag:

```bash
nest add nestjs-prisma --prismaVersion 2.2.0
```

If you want to skip installing dependencies use `--skipInstall` flag:

```bash
nest add nestjs-prisma --skipInstall
```

All available flags:

| Flag             |  Description                         |  Default                                                     |
| ---------------- | ------------------------------------ | ------------------------------------------------------------ |
|  `prismaVersion` | The Prisma version to be installed.  | [2.4.0](https://github.com/prisma/prisma/releases/tag/2.4.0) |
|  `skipInstall`   | Skip installing dependency packages. | `false`                                                      |

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

schematics .:nest-add
# execute schematics
schematics .:nest-add --debug=false
# or
schematics .:nest-add --dry-run=false
```

## Helpful

Helpful article about [Custom Angular Schematics](https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4) which also applies to Nest.
