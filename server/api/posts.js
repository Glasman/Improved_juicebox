const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();

    res.send(posts);
  } catch (error) {
    next(error);
  }
});

// /api/posts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const postid = parseInt(req.params.id)
    const user = await prisma.post.findUnique({
      where: { id: postid },
    });
    res.send(user || {})
  } catch (err) {
    next(err);
  }
});

module.exports = router;
