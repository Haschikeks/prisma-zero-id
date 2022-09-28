import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const data = {
    id: 0,
  };

  await prisma.user.upsert({
    create: data,
    update: data,
    where: {
      id: data.id,
    },
  });
}

main()
  .finally(() => {
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
