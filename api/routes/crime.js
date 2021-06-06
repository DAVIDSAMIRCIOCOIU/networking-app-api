const express = require("express");
const axios = require("axios");
const router = express.Router();

// const crimeController = require('../controllers/crime');

// router.get("/crimes", (req, res, next) => {
//          axios.post("https://data.police.uk/api/crimes-street/all-crime", {poly: "52.268,0.543:52.794,0.238:52.130,0.478", date: "2020-01"}, {
//             // headers: {
//             //     'Content-Type': 'application/x-www-form-urlencoded',
//             //     "Access-Control-Allow-Origin":"*"
                      
//             //         }, 
//         }).then(res=>{
//             res.send(res);
//             console.log(res)
//         });
// });


router.get("/test", (req, res, next) => {
    console.log("'/test' call");
    axios.get("https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2020-01")
      .then(response => {
          console.log(response.data)
          res.send(response.data);
      })
      .catch(function(error) {
        res.send({
            status: '500',
            message: error
        })})
  })


  router.get("/crimes",  (req, res, next) => {
    axios.post("https://data.police.uk/api/crimes-street/all-crime", {poly: "52.268,0.543:52.794,0.238:52.130,0.478", date: "2020-01"},)
      .then(response => {
          console.log(response.data)
          res.send(response.data);
      })
      .catch(error => {
        res.send({
            status: '500',
            message: error
        })})
  })


module.exports = router;