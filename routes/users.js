//requiring the express module and storing in express variable
//calling the .Router() function and assigning it to router variable

const express = require('express');
const router = express.Router();

//This is a named import (require).  Since /validation/users.js is exporting a whole object with key/value pairs, the variable value that comes through the import will be that object.  The easiest way to access the named function is to write the key name in an object when you write the import (require) statement lik this:

let {validateUserData} = require("../validation/users");

const userList = [];

/* GET users listing. */
//Because our base path for users.js is "/users" and the route names concatenate, the final path for this route is going to be "localhost:3000/users/all"
router.get('/all', function(req, res, next) {
  // res.send('users page');
  res.json({
    success: true,
    userList: userList
});
})

// The final url for this route is going to be "/users/single"
router.get("/single", (req, res) => {
  res.json({
    success: true,
    user: "Single User"
  })
})

router.post("/create-one", (req, res) => {
  //use try block, for validation code
  try {

    //anticipating fields of the post request /create-one
    //parse out request data to local variables
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const favoriteFoods = req.body.favoriteFoods;

    //create userData object fields:
    const userData = {
      email, 
      firstName,
      lastName,
      age,
      favoriteFoods,
      fullName: firstName + lastName,
      creaatedAt: new Date(),
      lastModified: new Date()
    };

    //pass user data object to our validate function
    const userDataCheck = validateUserData(userData);

    if (userDataCheck.isValid === false) {
      throw Error(userDataCheck.message)

      //res.json({
      //   success: false,
      //   message: userDataCheck.message,
      // });
      // return;
    }

    userList.push(userData);

    console.log("userList ", userList);

    res.json({
      success: true,
    });
  } catch (e){
      //In the catch block, we always want to do 2 things: 1. console.log the error and 2. respond with an error object
      console.log(e);
      res.json({
        success: false, 
        error: String(e)
      });
  }
});


module.exports = router;
