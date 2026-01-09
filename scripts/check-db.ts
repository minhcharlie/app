import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const analyses = await prisma.promptAnalysis.findMany({
    orderBy: { createdAt: 'desc' },
    take: 1
  })
  console.log(JSON.stringify(analyses, null, 2))
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
