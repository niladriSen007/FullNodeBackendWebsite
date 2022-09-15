import express from "express"
import exphbs  from 'express-handlebars';
const app= express()
const port = process.env.PORT || 4000;
import path from "path"
import {connection} from "./database/Connection.js"
const __dirname = path.resolve();
import{User} from "./models/userMessage.js"


//setting the static path
const staticPath= path.join(__dirname,"/public");

// const partialsPath =   path.join(__dirname,"/src/templates/views")
// console.log(partialsPath)

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: false,
    layoutsDir: "views/layouts/",
    partialsDir  : [
        //  path to your partials
        path.join(__dirname, '/src/templates/partials')
]
}));


//to set the view engine 
app.set('view engine', '.hbs');
//giving the views path otherwise a error will occur of 'no such file in directory ../views/layout/main.hbs'
app.set('views', path.join(__dirname,"/src/templates/views"));


app.use("/css", express.static(path.join(__dirname,"/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"/node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname,"/node_modules/jquery/dist")));
app.use("/style",express.static(path.join(__dirname,"/public/css")));

app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("index");
})

// app.get("/index",(req,res)=>{
//     res.render("index");
// })

// app.get("/about",(req,res)=>{
//     res.render("about");
// })

// app.get("/contacts",(req,res)=>{
//     res.render("contacts");
// })

// app.get("/services",(req,res)=>{
//     res.render("services");
// })

app.post("/",async(req,res)=>{
    try{
            const userData = new User(req.body)
            const userDetails = await userData.save();
            res.status(201).render("index")
    }
    catch(e)
    {
            res.status(500).send(e);
    }
})

app.listen(port,()=>{
    console.log("Server is running");
})