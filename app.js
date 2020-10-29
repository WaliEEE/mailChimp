const express = require("express");
const bParser = require("body-parser");
const https = require("https");
const request = require("request");
const app = express();

app.use(express.static("public"));     //using static folder(public) 
app.use(bParser.urlencoded({ extended: true })); //using body-parser 
app.listen(process.env.PORT || 3000, (req, res) => 
{
    console.log("Working Server")
})

//response to Display html file
app.get("/", (req,res) => 
{
    res.sendFile(`${__dirname}/index.html`)
})


//response after post
app.post("/", (req, res) => 
{
  const firstName = req.body.fName;
  const lastName  = req.body.lName;
  const email = req.body.email;

// api list id from audience/subscriber
const url = 'https://us2.api.mailchimp.com/3.0/lists/bd6e56024f' 
const options=
{
  method: "POST",
  auth: "Wali:e7d29b1ddb8da01dc9c93aac08d4c46e-us2" //authenticate
}

  //api reference for subscriber object list 
  const data = 
  {
    members: 
    [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: 
        {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  //collect data and json it
  const jsonData= JSON.stringify(data)

  //now work with formatted json data
  const request = https.request(url, options, (response) => 
  {
    //callback
    if (response.statusCode === 200) 
    res.sendFile(`${__dirname}/success.html`)
    else 
    res.sendFile(`${__dirname}/failure.html`)
   
    //not imp
    response.on("data", (data) => 
    {
      console.log("Success");
    });
  });

  //multiple write
  request.write(jsonData)
  request.end()
});

//if fails redirect to home page through danger route
app.post("/danger", (req, res) => 
{
  res.redirect("/")
})


//api keys : e7d29b1ddb8da01dc9c93aac08d4c46e-us2  list_id: bd6e56024f