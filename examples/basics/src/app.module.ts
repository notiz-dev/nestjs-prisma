import { Module } from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaModule, PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    // here or in main.ts
    // {
    //   provide: APP_FILTER,
    //   useFactory: ({ httpAdapter }: HttpAdapterHost) => {
    //     return new PrismaClientExceptionFilter(httpAdapter);
    //   },
    //   inject: [HttpAdapterHost],
    // },
  ],
})
export class AppModule {}
