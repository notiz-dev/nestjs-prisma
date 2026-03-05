import { DynamicModule, Logger, Module, Provider } from '@nestjs/common';
import {
  PrismaClientFactory,
  PrismaClientLike,
  PrismaModuleAsyncOptions,
  PrismaModuleOptions,
} from './prisma-options';
import { PRISMA_CLIENT } from './prisma.constants';
import { PrismaService } from './prisma.service';

@Module({})
export class PrismaModule {
  private static readonly logger = new Logger(PrismaModule.name);

  static forRoot<Client extends PrismaClientLike>(
    options: PrismaModuleOptions<Client>,
  ): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      providers: [
        { provide: PRISMA_CLIENT, useValue: options.client },
        {
          provide: options.name,
          useClass: PrismaService,
        },
      ],
      exports: [options.name],
    };
  }

  static forRootAsync<Client extends PrismaClientLike>(
    options: PrismaModuleAsyncOptions<Client>,
  ): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProvider(options),
        {
          provide: options.name,
          useClass: PrismaService,
        },
      ],
      exports: [options.name],
    };
  }

  private static createAsyncProvider<Client extends PrismaClientLike>(
    options: PrismaModuleAsyncOptions<Client>,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: PRISMA_CLIENT,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    if (options.useClass) {
      return [
        { provide: options.useClass, useClass: options.useClass },
        {
          provide: PRISMA_CLIENT,
          useFactory: async (optionsFactory: PrismaClientFactory<Client>) =>
            await optionsFactory.createPrismaClient(),
          inject: [options.useClass],
        },
      ];
    }

    this.logger.error('You must at least provide `useFactory` or `useClass`.');
    return [];
  }
}
