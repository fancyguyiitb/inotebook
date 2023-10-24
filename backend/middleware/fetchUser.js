const jwt = require("jsonwebtoken");
const JWT_SECRET = "fancyguyiitbroxxx1604";

const fetchuser = (req, res, next)=> {
    //get user from jwt token and add id to req object

    //we get token from the request header, and name it auth-token
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        //append the data to req.user object
        req.user = data;
        //this will run the next function in the route, that is the async (req, res) function
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;