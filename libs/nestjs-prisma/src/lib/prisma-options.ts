import { ModuleMetadata, Type } from '@nestjs/common';

export type PrismaClientLike = {
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;
};

export interface PrismaModuleOptions<Client extends PrismaClientLike> {
  /**
   * If "true", registers `PrismaModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean;

  /**
   * Choose a name to inject the prisma service with.
   *
   * @example
   * name = 'PrismaServiceAuth'
   *
   * constructor(
   *  @Inject('PrismaServiceAuth')
   *  private prismaAuth: PrismaService<PrismaClient>,
   * ){}
   *
   */
  name: string;

  /**
   * Pass an instance of your PrismaClient.
   *
   * @example client = new PrismaClient()
   */
  client: Client;
}

export interface PrismaClientFactory<Client extends PrismaClientLike> {
  createPrismaClient(): Promise<Client> | Client;
}

export interface PrismaModuleAsyncOptions<
  Client extends PrismaClientLike,
> extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;

  /**
   * Choose a name to inject the prisma service with.
   *
   * @example
   * name = 'PrismaServiceAuth'
   *
   * constructor(
   *  @Inject('PrismaServiceAuth')
   *  private prismaAuth: PrismaService<PrismaClient>,
   * ){}
   *
   */
  name: string;

  useClass?: Type<PrismaClientFactory<Client>>;

  useFactory?: (...args: any[]) => Promise<Client> | Client;
  inject?: any[];
}
