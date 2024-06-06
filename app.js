const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const app = express();
const port = 80;

// mongoose.connect("mongodb://localhost/contactDance");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.use('/static',express.static('static'));

// set the template engine
app.set('view engine','pug');

// set the views directory
app.set('views',path.join(__dirname,'template'));

// get the pug endpoint
app.get("/",(req,res)=>{
    res.status(200).render('home.pug');
});
app.get("/contact",(req,res)=>{
    res.status(200).render('contact.pug');
});

const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    address: String,
    describe: String
});

const Contact = new mongoose.model('Contact',contactSchema);

app.post("/contact",(req,res)=>{
    // console.log("alert");
    const mydata = new Contact(req.body);
    mydata.save().then(()=>{
    res.send("This item will be created succesfully in dataBase")
    // res.send(alert("done succesfully"));
    }).catch(()=>{
        res.status(400).send("item was not saved to the dataBase")
    })
    // console.log(myData.age);
    // console.log(this.name);
});
// app.post("/contact" ,(req,res)=>{
//     console.log(req.body.name);
//     // nm = req.body.name
//     // date = req.body.date
//     // email = req.body.email
//     // add = req.body.address
//     // describe = req.body.describe
//     // console.log(req.body.name);
//     // console.log(`[name = ${nm} \n DOB = ${date} \n email = ${email} \n address = ${add} \n describe = ${describe}]\n`);
//     // let outputToWrite = (`[name = ${n} \n DOB = ${dob} \n email = ${email} \n address = ${add} \n describe = ${describe}]\n`);
//     // fs.writeFileSync('gymoutput.txt', outputToWrite);
//     const params = {'message': 'your form is submitted successfully'};
//     // alert("successfull");
//     res.status(200).render( 'contact', params);
// });

// app.get("/index" ,(req,res)=>{
//     res.status(200).send("This is a dance academy website");
// });
// start the server
app.listen(port,()=>{
    console.log(`server is run successfully on port ${port}`);
})