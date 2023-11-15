const express = require("express")
const port = 5000;
const app = express();
const {MONGODB_URL} = require('./keys')
const mongoose = require("mongoose")
const cors = require('cors');
// const bodyParser = require('body-parser');
require("./models/User")
require("./models/post")
const myrouter =require('./routes/auth')
const myrouter2 =require('./routes/post')



// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());



app.use(myrouter);
app.use(myrouter2);

mongoose.connect(MONGODB_URL);
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeach");
})
mongoose.connection.on('error',(err)=>{
    console.log("mongoose error",err);
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

// const customMiddleWWear=(req,res,next)=>{
//     console.log("middle wear executed");
//     next();
// }

// app.use(customMiddleWWear);

// app.get('/',(req,res)=>{
//     console.log("home");
//     res.send("hello  world");
// })
// app.get('/about',customMiddleWWear,(req,res)=>{
//     console.log("about");
//     res.send("about page");
// })


