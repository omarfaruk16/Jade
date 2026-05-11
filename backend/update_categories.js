const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const residential = await prisma.serviceChildCategory.update({
    where: { slug: 'residential-interior-design' },
    data: { coverImage: 'http://localhost:5001/uploads/1778531819415-190400752.avif' }
  });
  
  const commercial = await prisma.serviceChildCategory.update({
    where: { slug: 'commercial-interior-design' },
    data: { coverImage: 'http://localhost:5001/uploads/1778531977614-310946807.avif' }
  });

  console.log('Updated categories:', { residential, commercial });
}

main().catch(console.error).finally(() => prisma.$disconnect());
