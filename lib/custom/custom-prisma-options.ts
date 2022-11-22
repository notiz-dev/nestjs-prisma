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
   * e.g. name = 'PrismaServiceAuth'
   *
   * constructor(
   *  @Inject('PrismaServiceAuth')
   *  private prismaCms: CustomPrismaService<PrismaCms>,
   * ){}
   *
   */
  name: string;

  /**
   * Pass an instance of your PrismaClient, useful when you specified a custom output path for your PrismaClient.
   *
   * e.g. client = new PrismaClient()
   */
  client: Client;
}
