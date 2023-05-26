import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomPrismaService } from 'nestjs-prisma';
import { extendedPrismaClient } from './prisma.extension';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const customPrismaService: CustomPrismaService<extendedPrismaClient> =
    app.get('PrismaService');
  await customPrismaService.enableShutdownHooks(app);

  customPrismaService.client.$on('error', (e) => {});

  await app.listen(3000);
}
bootstrap();
