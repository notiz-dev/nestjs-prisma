import { faker } from '@faker-js/faker';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../apps/api/src/app/generated/prisma/client';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.deleteMany({});
  const users = Array.from({ length: 50 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
  }));

  await prisma.user.createMany({
    data: users,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
