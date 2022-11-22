import { DynamicModule, Module } from '@nestjs/common';
import {
  CustomPrismaModuleOptions,
  PrismaClientLike,
} from './custom-prisma-options';
import { CustomPrismaService } from './custom-prisma.service';

@Module({})
export class CustomPrismaModule {
  static forRoot<Client extends PrismaClientLike>(
    options: CustomPrismaModuleOptions<Client>,
  ): DynamicModule {
    const prismaService = new CustomPrismaService(options.client);
    return {
      global: options.isGlobal,
      module: CustomPrismaModule,
      providers: [
        {
          provide: options.name,
          useValue: prismaService,
        },
      ],
      exports: [options.name],
    };
  }
}
