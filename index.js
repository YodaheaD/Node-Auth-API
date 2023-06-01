const express = require("express");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const axios= require("axios")

app.use(express.json());
 
// -> Verify Your User's Token with Middleware
/**
 * -> We send the token along with the request payloads in the request headers. 
 * --- We then check if the token was sent, and verify it using the jwt.verify method.
 * 
 * -> 'verifyUserToken' function is used to secure the 'api/users' route.
 */
const verifyUserToken = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized request");
    }
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    try {
        // -> Once a user is verified, we can save their details in the request object to
        // * keep track of their activities in the application.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(400).send("Invalid token.");
    }
  };
  

//--- End of Middleware --- \\
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
const users = [];

// -> Build App Routes
//* -> Let's protect the 'api/users' route. Restrict access to only authorized
//* --- users by adding the verifyUserToken function as a middleware to the route 'API/USERS'.
app.get("/api/users", verifyUserToken, async (req, res) => {
    const getData =  await axios.get(process.env.MOCK_API_LINK)
    console.log('-> Data:',getData.data)
    
    res.json(getData.data);//res.json(users); //-> Return the user's information

  });

/** Get Route with NO JWT AUTHENTICATION
  app.get("/api/users",  async(req, res) => {
    const getData =  await axios.get(Link1)
    console.log('Data',getData.data)
    res.json(getData.data);
  });*/


// -> Create An Auth Route
app.post("/api/register", async (req, res) => {
  const user = req.body;
  if (!user.email || !user.password) {
    return res.status(400).send("Username and password are required.");
  }
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  users.push(user);
  res.json(user);
});

// -> Create route to log in registered users
/**
 * -> We import 'bcryptjs' to 
 *  1) hash a user's password before saving it. 
 *  2) check if the user provides the required fields , if yes 
 *  3) add them to the user's array.
 * */

app.post("/api/login", async (req, res) => {
    const user = req.body;
    // * -> Here, we import jsonwebtoken to sign a token for the registered users.
    // * --- First, we check if the users exist in the user's array. You can also 
    // * --- run your find query if you are integrating a database.
    //check if user exists
    const foundUser = users.find((user) => user.email === req.body.email);
    if (!foundUser) {
      return res.status(400).send("Invalid email or password");
    }
    // * -> Then we compare the password with the saved hashed version. 
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password");
    }
    // * -> When the user satisfies these checks, we then sign a token for the 
    // * --- user passing the user's details, the JWT_SECRET, and expiration time.
    //create token
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  });