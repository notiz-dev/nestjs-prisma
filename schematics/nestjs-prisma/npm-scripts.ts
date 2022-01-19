export interface NpmScript {
  name: string;
  command: string;
}

export const npmScripts: NpmScript[] = [
  {
    name: 'migrate:dev',
    command: 'npx prisma migrate dev',
  },
  {
    name: 'migrate:dev:create',
    command: 'npx prisma migrate dev --create-only',
  },
  {
    name: 'migrate:deploy',
    command: 'npx prisma migrate deploy',
  },
  {
    name: 'prisma:generate',
    command: 'npx prisma generate',
  },
  {
    name: 'prisma:studio',
    command: 'npx prisma studio',
  },
  {
    name: 'prisma:seed',
    command: 'npx prisma db seed',
  },
];
