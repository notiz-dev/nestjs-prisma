import { prisma } from '../src/prisma.extension';

async function main() {
  console.log('Seeding database...');
  console.time('Seeding complete 🌱');

  // TODO seed development data
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      name: 'Ham Burger',
      email: 'ham@burger.dev',
    },
  });

  console.timeEnd('Seeding complete 🌱');
}

main().catch((e) => console.log(e));
