const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function seed() {
  try {
    const saltRounds = 10;

    const hashedPineapple = await bcrypt.hash('pineapple', saltRounds);
    const hashedRock = await bcrypt.hash('rock', saltRounds);
    const hashedTikihead = await bcrypt.hash('tikihead', saltRounds);


    await prisma.user.createMany({
      data: [
        { username: 'Spongebob', password: hashedPineapple },
        { username: 'Patrick', password: hashedRock },
        { username: 'Squidward', password: hashedTikihead },
      ],
    });

    const spongebob = await prisma.user.findFirst({
      where: {
        username: "Spongebob",
      },
    });

    const patrick = await prisma.user.findFirst({
      where: {
        username: "Patrick",
      },
    });

    const squidward = await prisma.user.findFirst({
      where: {
        username: "Squidward",
      },
    });

    await prisma.post.create({
      data: {
        title: "I love working at the krusty krab",
        content: "krabby patties are my fave",
        userId: spongebob.id,
      },
    });

    await prisma.post.create({
      data: {
        title: "spengbab",
        content: "my name is spongebob",
        userId: spongebob.id,
      },
    });

    await prisma.post.create({
      data: {
        title: "I love posting to help fill out the seed",
        content: "krabby patties are my super mega fave",
        userId: spongebob.id,
      },
    });

    await prisma.post.create({
      data: {
        title: "I love living under a rock",
        content: "I'm a star!",
        userId: patrick.id,
      },
    });

    await prisma.post.create({
      data: {
        title: "I too like the krusty krab",
        content: "krabby patties are my fave too",
        userId: patrick.id,
      },
    });

    await prisma.post.create({
      data: {
        title: "totally real dummy data",
        content: "i love generating dummy data",
        userId: patrick.id,
      },
    });

    await prisma.post.create({
      data: {
        title: "grr i hate work",
        content: "i am a squid",
        userId: squidward.id,
      },
    });

    await prisma.post.create({
      data: {
        title: "2nd dummy post by squidward",
        content: "i am a squid!",
        userId: squidward.id,
      },
    });

    await prisma.post.create({
      data: {
        title: "3rd dummy post by squidward",
        content: "i am a squid!!!!!!",
        userId: squidward.id,
      },
    });
    console.log("Tables seeded!")
  } catch (err) {
    throw err;
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
