import { Injectable } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client';

const extend = (client: PrismaClient) =>
  client.$extends({
    model: {
      user: {
        async findByEmail(email: string) {
          return client.user.findFirst({ where: { email } });
        },
      },
    },
  });

type ExtendedPrismaClient = ReturnType<typeof extend>;

@Injectable()
export class PrismaService extends PrismaClient {
  private _extendedClient: ExtendedPrismaClient;

  get extendedClient() {
    return this._extendedClient;
  }

  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
    super({ adapter });

    this._extendedClient = extend(this);
  }
}
