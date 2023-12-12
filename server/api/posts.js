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


//didn't have a chance to get CRUD operations because I was focusing on reviewing JWT and bcrypt
//but now that I have access to JWT tokens I can write up some conditional logic to either execute CRUD operations if a token does exist
//or returns a 401 error if the token doesn't match up
module.exports = router;