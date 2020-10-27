const express = require("express");
const bParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bParser.urlencoded({ extended: true }));
app.listen(3000, (req, res) => 
{
    console.log("Hello Everyone")
})


app.get("/", (req,res) => 
{
    res.sendFile(`${__dirname}/index.html`)
})

app.post("/", (req, res) => 
{
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

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
  const jsonData= JSON.stringify(data)

  const url = 'https://us2.api.mailchimp.com/3.0/lists/bd6e56024f' // list id from audience

  const options=
  {
    method: "POST",
    auth: "Wali:e7d29b1ddb8da01dc9c93aac08d4c46e-us2"
  }

  const request = https.request(url, options, (response) => 
  {
    response.on("data", (data) => 
    {
     console.log("Success")
    })
  })

  request.write(jsonData)
  request.end()
});


//api keys : e7d29b1ddb8da01dc9c93aac08d4c46e-us2  list_id: bd6e56024f