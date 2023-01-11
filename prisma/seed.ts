import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.create({ data: { id: "a" } });
  const user = await prisma.user.create({ data: { id: "b" } });
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
