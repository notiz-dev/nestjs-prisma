export interface Schema {
  /**
   * Create a Prisma service extending the Prisma Client and module.
   */
  addPrismaService?: boolean;

  /**
   * Create a Dockerfile and docker-compose.yaml.
   */
  addDocker?: boolean;

  /**
   * Select a datasource provider to pass to `prisma init`.
   */
  datasourceProvider: DatasourceProvider;

  /**
   * Node version for the builder and runner image.
   */
  dockerNodeImageVersion: string;

  /**
   * The name for the Prisma Service extending the Prisma Client.
   */
  name: string;

  /**
   * Prisma version.
   */
  prismaVersion: string;

  /**
   * Skip installing dependency packages.
   */
  skipInstall?: boolean;

  /**
   * Skip initializing Prisma.
   */
  skipPrismaInit?: boolean;
}

export type DatasourceProvider =
  | 'postgresql'
  | 'mysql'
  | 'sqlite'
  | 'sqlserver'
  | 'mongodb';
