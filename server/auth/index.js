const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const saltRounds = 10;

router.post("/register", async (req, res) => {
  const unhashed = req.body.password;

  console.log("Unhashed: ", unhashed);

  const hashed = await bcrypt.hash(unhashed, saltRounds);

  console.log("Hashed: ", hashed);

  try {
    console.log(req.body);
    const result = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashed,
      },
    });

    const token = jwt.sign({ id: result.id }, process.env.SECRET);

    res.send(token);
  } catch (err) {
    res.send(err);
  }
});

//works for newly registered users but not ones made by the seed, will have to go back
//and rewrite how we store seeded passwords
router.post("/", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (user) {
    const myPlaintextPassword = req.body.password;
    const isMatch = await bcrypt.compare(myPlaintextPassword, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET);
      res.send(token)
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;