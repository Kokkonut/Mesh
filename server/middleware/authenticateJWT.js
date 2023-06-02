const jwt = require("jsonwebtoken");

exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.session.redirected = true;
    return res.status(401).json({ message: "Unauthorized" });
    // return res.status(401).redirect("/login");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      req.session.redirected = true;
      return res.status(401).json({ message: "Unauthorized" });
      // return res.status(401).redirect("/login");
    }

    req.user = decoded;
    next();exports.authenticateJWT = (req, res, next) => {
      const token = req.cookies.token;
    
      if (!token) {
        req.session.redirected = true;
        return res.status(401).json({ message: "Unauthorized" });
        // return res.status(401).redirect("/login");
      }
    
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.error("JWT verification error:", err);
          req.session.redirected = true;
          return res.status(401).json({ message: "Unauthorized" });
          // return res.status(401).redirect("/login");
        }
    
        // Clear the redirected status, since we have a valid token
        req.session.redirected = false;
        req.user = decoded;
        next();
      });
    };
    
  });
};
