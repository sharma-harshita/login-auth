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
    const token = value && value.split(" ")[1];
    try {
        const user = jwt.verify( token, SECRET_KEY );
        next();
    } catch (error) {
        res.status(403).json({
            success : false,
            message : "Error while verifying token"
        })
    }
}

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

app.post("/login", (req,res)=>{
    const jwtToken = jwt.sign(req.query, SECRET_KEY , {expiresIn:"5000"})
    res.json({
        jwtToken : jwtToken
    })
})

app.listen(8000, ()=>{
    console.log("Application has started successfully");
})


app.get("/user", verifyToken , (req, res)=>{
    res.json({
        name:"John"
    })
})