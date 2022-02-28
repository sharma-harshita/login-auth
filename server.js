const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const saltRounds = 5;
const SECRET_KEY = "qwertyuiuytfghjkQWERTYUIFDSFGHJK";

app.use(cors());

const verifyToken = (req, res, next) => {
    const value = req.header("authorization") || req.header("Authorization");

    const token = value.split(" ")[1];
    try {
        jwt.verify( token, SECRET_KEY );    // if this function is failing then we will send the response to the frontend from catch block.
        next();
    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Verification of token is not succeded, user is not authorized"
        })
    }
}

// hashing the password
app.post("/register",(req,res)=>{
    bcrypt.genSalt(saltRounds, (err, salt)=>{
        bcrypt.hash(req.query.password, salt, (err, hPswd)=>{
            if (err) console.log(err);
            else console.log(hPswd);
        })
    })
    res.status(200).json({
        status:"Success registered"
    })
})

// creating the token for the user
app.post("/login", (req,res)=>{
    const jwtToken = jwt.sign(req.query, SECRET_KEY, {expiresIn:"10000"} )
    res.json({
        jwtToken : jwtToken
    })
})

// I am verifying the user by token , if token is not expired then api call will be made else not
app.get("/user", verifyToken , (req, res)=>{
    res.json({
        name:"John"
    })
})


app.listen(8000, ()=>{
    console.log("Application has started successfully");
})


