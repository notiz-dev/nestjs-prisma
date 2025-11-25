import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' });
export const prisma = new PrismaClient({ adapter });

export type PrismaClientType = typeof prisma;
