import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({
  log: [{
    emit: 'event',
    level: 'query',
  }],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
})

async function main() {
  const company = await prisma.company.create({
    data: { id: "93eb7e1e-52a0-4c35-a180-47e08621450c" },
  });
  const user = await prisma.user.create({
    data: { id: "1b58aaab-6176-4550-88c9-6c731a42c8db" },
  });
  const userSettings: Prisma.UserSettingsUncheckedCreateInput = {
    userId: user.id,
    companyId: company.id,
    startDate: new Date(2023, 0, 1, 12),
  };

  const data = await prisma.userSettings.create({
    data: userSettings,
  });
  console.log(data);
}

main()
  .finally(() => {
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
