const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: " Auth header not found" });
  }

  const token = authHeader.split(" ")[1]; // the actual token

  if (!token) {
    return res.status(401).json({ error: " Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //decoded token
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
