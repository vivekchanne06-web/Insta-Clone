const jwt = require("jsonwebtoken");


async function authMiddleware(req, res, next) {
     const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }


    let decoded= null;
    try {
         decoded = jwt.verify(token, process.env.JWT_SECRET); 
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
    console.log("Decoded user info:", decoded);
}   

module.exports = authMiddleware;