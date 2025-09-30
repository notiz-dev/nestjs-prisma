import { prisma } from '../src/prisma.extension';

async function main() {
  await prisma.user.create({
    data: {
      name: 'Ham Burger',
      email: 'ham@burger.dev',
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
