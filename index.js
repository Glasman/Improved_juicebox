const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
 
 try {
  await prisma.user.create({
    data: {
      username: "Spongebob",
      password: "pineapple",
      posts: {
        create: { 
          title: 'I love the krusty krab',
          content: "Krabby patties are my fave",
       },
      }
    }
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.dir(allUsers, { depth: null })
  
 } catch (err) {
  throw err;
 }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })