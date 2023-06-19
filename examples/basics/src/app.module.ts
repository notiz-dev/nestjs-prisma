import { Module } from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    // register filter here or in main.ts
    // {
    //   provide: APP_FILTER,
    //   useFactory: ({ httpAdapter }: HttpAdapterHost) => {
    //     return new PrismaClientExceptionFilter(httpAdapter);
    //   },
    //   inject: [HttpAdapterHost],
    // },
    // or
    // providePrismaClientExceptionFilter()
  ],
})
export class AppModule {}
