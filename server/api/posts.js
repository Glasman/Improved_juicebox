const router = require ('express').Router();

router.get("/", (req, res, next) => {

res.send("we've successfully connected to the posts router")


})

module.exports = router;