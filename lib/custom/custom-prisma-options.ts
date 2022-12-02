import { ModuleMetadata, Type } from '@nestjs/common';

export type PrismaClientLike = {
  $on(eventType: string, callback: () => Promise<void>): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;
};

export interface CustomPrismaModuleOptions<Client extends PrismaClientLike> {
  /**
   * If "true", registers `PrismaModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean;

  /**
   * Choose a name to inject the custom prisma service with.
   *
   * @example
   * name = 'PrismaServiceAuth'
   *
   * constructor(
   *  @Inject('PrismaServiceAuth')
   *  private prismaAuth: CustomPrismaService<PrismaClient>,
   * ){}
   *
   */
  name: string;

  /**
   * Pass an instance of your PrismaClient, useful when you specified a custom output path for your PrismaClient.
   *
   * @example client = new PrismaClient()
   */
  client: Client;
}

export interface CustomPrismaClientFactory<Client extends PrismaClientLike> {
  createPrismaClient(): Promise<Client> | Client;
}

export interface CustomPrismaModuleAsyncOptions<Client extends PrismaClientLike>
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;

  /**
   * Choose a name to inject the custom prisma service with.
   *
   * @example
   * name = 'PrismaServiceAuth'
   *
   * constructor(
   *  @Inject('PrismaServiceAuth')
   *  private prismaAuth: CustomPrismaService<PrismaClient>,
   * ){}
   *
   */
  name: string;

  useClass?: Type<CustomPrismaClientFactory<Client>>;

  useFactory?: (...args: any[]) => Promise<Client> | Client;
  inject?: any[];
}
