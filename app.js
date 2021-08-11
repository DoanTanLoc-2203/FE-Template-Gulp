const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 3000;
const mysql = require('mysql'); 

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static("./calenda"));

/* Username validation */
function username_validate(username){
  let usernameRegex = /^[a-zA-Z0-9\-_]+$/;
  if(username.length < 8){/* Check length and empty string */
    return false;
  }
  else if(!usernameRegex.test(username)){/* Check character*/
    return false;
  }
  else{
    return true;
  }
}
/* Password validation*/
function password_validate(password){
  let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9])+$/;
  if(password.length < 5){/* Check length and empty string */
    return false;
  }
  else if(!passwordRegex.test(password)){/* Check character*/
    return false;
  }
  else{
    return true;
  }
}
/* Email validation */
function email_validate(email){
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.length == 0){
    return false;
  }
  else if(!emailRegex.test(email)){/* Check character*/
    return false;
  }
  else{
    return true;
  }
}
/* Compare 2 date */
function isDateGreater(a, b){
  daya = a.split('/');
  dayb = b.split('/');
  let tempa = new Date(daya[2], daya[1], daya[0]);
  let tempb = new Date(dayb[2], dayb[1], dayb[0]);
  if(tempa < tempb ) return -1;
  else if(tempa > tempb) return 1;
  else return 0;

}
/* BirthDay validation */
function birthday_validate(birthday){
  let birthdayRegex = /^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  let now = new Date;
  let substr = now.toLocaleDateString();
  dayinfo = substr.split('/');
  if(dayinfo[0].length == 1){
    dayinfo[0] = '0' + dayinfo[0];
  }
  if(dayinfo[1].length == 1){
    dayinfo[1] = '0' + dayinfo[1];
  }
  substr = dayinfo[0] + '/' + dayinfo[1] + '/' + dayinfo[2];
  if(!birthdayRegex.test(birthday)){/* Check character*/
    return false;
  }
  else if(isDateGreater(birthday, substr) == 1){
    return false;
  }
  else{
    return true;
  }
}

var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "SWvp9Wugki",
  password: "h7Yjs6Ffyq",
  port: 3306,
  database: "SWvp9Wugki"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post('/sent-data', (req, res) =>{
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let birthday = req.body.birthday;
  if(username_validate(username) && password_validate(password) && email_validate(email) && birthday_validate(birthday)){
    let sqlquery = "INSERT INTO `user_info`(`USER_NAME`, `PASSWORD`, `EMAIL`, `BIRTHDAY`) VALUES (\""+ username +"\",\"" + password + "\",\"" + email + "\",\"" + birthday + "\")";
    con.query(sqlquery, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("INSERT SUCCESS!");
    });
  }
  else{
    res.send("INSERT ERROR!");
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
