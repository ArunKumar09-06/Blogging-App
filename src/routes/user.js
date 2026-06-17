const express = require("express");
const router = express.Router();

const {handleUserSignup, handleUserLogin, handleLogout} = require("../controllers/user.js");

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/logout", handleLogout);


module.exports = router;