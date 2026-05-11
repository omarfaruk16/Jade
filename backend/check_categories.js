const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const children = await prisma.serviceChildCategory.findMany({
    select: { name: true, coverImage: true }
  });
  console.log(JSON.stringify(children, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
