const User = require("../models/user");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  try {
    if (!email || !password) {
      return res.status(400).json({ errormessage: "Email and password are required" });
    }

    const matchingUser = await User.findOne({ email: email });

    if (!matchingUser) {
      return res.status(404).json({ errormessage: "USER NOT FOUND" });
    } else {
      if (await matchingUser.comparePassword(password)) {
        const token = jwt.sign(
          { userId: matchingUser._id},
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          message: "Login successful",
          token,
          user: {
            id: matchingUser._id,
            email: matchingUser.email,
          },
        });
      } else {
        return res.status(401).json({ errormessage: "WRONG PASSWORD" });
      }
    }
  } catch (err) {
    res.status(500).json({ errormessage: "UNEXPECTED ERROR" });
  }
});

module.exports = router;
