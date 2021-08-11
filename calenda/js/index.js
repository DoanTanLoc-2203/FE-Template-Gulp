/* Variable */
let date = new Date();
let preDate;
let min_year = 1950;
let max_year = date.getFullYear();
/************/

/* Selector */
let month = document.getElementById("month");  
let year = document.getElementById("year");
let currentDate = document.getElementById("currentDate");
let day = document.getElementById("day");
/* */

/* Initial */
render_year();
render_calenda();
render_curDay();
/* */

/* Render year from min_year to max_year into year select */
function render_year(){
  let yearformat = "";
  for(let i = min_year; i <= max_year; i++){
    yearformat += `<option value="${i}">${i}</option>`;
    year.innerHTML = yearformat;
  }
}
/* Render current day into text-box and active current day in day table */
function render_curDay(){
  let curDay = new Date;
  preDate = curDay;
  let substr = curDay.getDate() + '/' + (curDay.getMonth() + 1) + '/' +curDay.getFullYear();
  dayinfo = substr.split('/');
  if(dayinfo[0].length == 1){
    dayinfo[0] = '0' + dayinfo[0];
  }
  if(dayinfo[1].length == 1){
    dayinfo[1] = '0' + dayinfo[1];
  }
  currentDate.value = dayinfo[0] + '/' + dayinfo[1] + '/' + dayinfo[2];
  document.getElementById("day-" + curDay.getDate()).classList.add("calenda__content__day__item--active");
}
/* Render day table*/
function render_calenda(){
  let numDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  let tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  tempDate.setDate(1);
  let lastDay_preMonth = tempDate.getDay();
  let dayformat = "";
  month.value = tempDate.getMonth();
  year.value = tempDate.getFullYear();
  for(let i = 0; i < lastDay_preMonth; i++){
    dayformat += `<div class="calenda__content__day__item--empty"></div>`;
    day.innerHTML = dayformat;
  }
  for(let i = 1; i <= numDay; i++){
    dayformat += `<div id="day-${i}" class="calenda__content__day__item" onClick="onClick_day(event);">${i}</div>`;
    day.innerHTML = dayformat;
  }
  for(let i = numDay + lastDay_preMonth; i % 7 != 0; i++){
    dayformat += `<div class="calenda__content__day__item--empty"></div>`;
    day.innerHTML = dayformat;
  }
}
/* Previous month Click-function */
function onClick_preMonth(){
  let tempDate = new Date(date.getFullYear(), date.getMonth());
  tempDate.setMonth(tempDate.getMonth() - 1);
  if(tempDate.getFullYear() > min_year){
    date.setMonth(date.getMonth() - 1);
  }
  render_calenda();
  update_actDay();
}
/* Next month Click-function */
function onClick_nextMonth(){
  let tempDate = new Date(date.getFullYear(), date.getMonth());
  tempDate.setMonth(tempDate.getMonth() + 1);
  if(tempDate.getFullYear() <= max_year){
    date.setMonth(date.getMonth() + 1);
  }
  render_calenda();
  update_actDay();
}
/* Previous year Click-function */
function onClick_preYear(){
  if(date.getFullYear() > min_year){
    date.setFullYear(date.getFullYear() - 1)
  }
  render_calenda();
  update_actDay();
}
/* Next year Click-function */
function onClick_nextYear(){
  if(date.getFullYear() < max_year){
    date.setFullYear(date.getFullYear() + 1)
  }
  render_calenda();
  update_actDay();
}
/* Update when year select is changed */
function onChange_selectYear(){
  date.setFullYear(year.value);
  render_calenda();
  update_actDay();
}
/* Update when month select is changed */
function onChange_selectMonth(){
  date.setMonth(month.value);
  render_calenda();
  update_actDay();
}
/* Update day table when text-box is changed */
function update_actDay(){
  let data = currentDate.value.split('/');
  if(month.value == data[1] - 1 && year.value == data[2]){
    let day = document.getElementById("day-" + data[0]);
    day.classList.add("calenda__content__day__item--active");
  }
}
/* Avtice day in day table and change day value in text-box */
function onClick_day(event){
  let tempDate = new Date(date.getFullYear(), date.getMonth(), event.target.innerHTML);
  document.getElementById("day-" + preDate.getDate()).classList.remove("calenda__content__day__item--active");
  preDate = tempDate;
  let substr = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
  dayinfo = substr.split('/');
  if(dayinfo[0].length == 1){
    dayinfo[0] = '0' + dayinfo[0];
  }
  if(dayinfo[1].length == 1){
    dayinfo[1] = '0' + dayinfo[1];
  }
  currentDate.value = dayinfo[0] + '/' + dayinfo[1] + '/' + dayinfo[2];
  let day = document.getElementById("day-" + event.target.innerHTML);
  day.classList.add("calenda__content__day__item--active");
}
/* Toggle calenda*/
function onClick_display_calenda(){
  if(document.getElementById("calenda").style.display == "none")
    document.getElementById("calenda").style.display = "block"; 
  else
    document.getElementById("calenda").style.display = "none"; 
}
/* Submit button */
function onClick_submit(){
  let username = document.getElementsByName("username")[0].value;
  let password = document.getElementsByName("password")[0].value;
  let email = document.getElementsByName("email")[0].value;
  let birthday = document.getElementsByName("birthday")[0].value;
  user_check = username_validate(username);
  pass_check = password_validate(password);
  email_check = email_validate(email);
  birth_check = birthday_validate(birthday);
  if(user_check && pass_check && email_check && birth_check){
    document.getElementById("submit").type = "submit";
  }
}
/* Refresh button */
function onClick_refresh(){
  location.reload(); 
}
/* Toggle password */
function onClick_toggle_password(){
  let x = document.getElementsByName("password")[0];
  if (x.type === "password") {
    x.type = "text";
    document.getElementById("toggle-password").className = "fas fa-eye-slash";
  } else {
    x.type = "password";
    document.getElementById("toggle-password").className = "fas fa-eye";
  }
}
/* Username validation */
function username_validate(username){
  let usernameRegex = /^[a-zA-Z0-9\-_]+$/;
  if(username.length < 8){/* Check length and empty string */
    document.getElementsByName("alert-username")[0].innerHTML = `<strong>Invalid</strong> User name has least 8 character`;
    document.getElementsByName("alert-username")[0].style.display = "block";
    return false;
  }
  else if(!usernameRegex.test(username)){/* Check character*/
    document.getElementsByName("alert-username")[0].innerHTML = `<strong>Invalid</strong> User name only include characters: ['a-z', 'A-Z', '0-9', '-', '_']`;
    document.getElementsByName("alert-username")[0].style.display = "block";
    return false;
  }
  else{/* toggle alert */
    document.getElementsByName("alert-username")[0].style.display = "none";
    return true;
  }
}
/* Password validation*/
function password_validate(password){
  let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9])+$/;
  if(password.length < 5){/* Check length and empty string */
    document.getElementsByName("alert-password")[0].innerHTML = `<strong>Invalid</strong> Password has least 5 character`;
    document.getElementsByName("alert-password")[0].style.display = "block";
    return false;
  }
  else if(!passwordRegex.test(password)){/* Check character*/
    document.getElementsByName("alert-password")[0].innerHTML = `<strong>Invalid</strong> Password least one uppercase letter, one lowercase letter, one number, no special character`;
    document.getElementsByName("alert-password")[0].style.display = "block";
    return false;
  }
  else{/* toggle alert */
    document.getElementsByName("alert-password")[0].style.display = "none";
    return true;
  }
}
/* Email validation */
function email_validate(email){
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.length == 0){
    document.getElementsByName("alert-email")[0].innerHTML = `<strong>Invalid</strong> Empty email`;
    document.getElementsByName("alert-email")[0].style.display = "block";
    return false;
  }
  else if(!emailRegex.test(email)){/* Check character*/
    document.getElementsByName("alert-email")[0].innerHTML = `<strong>Invalid</strong> Invalid email format`;
    document.getElementsByName("alert-email")[0].style.display = "block";
    return false;
  }
  else{/* toggle alert */
    document.getElementsByName("alert-email")[0].style.display = "none";
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
    document.getElementsByName("alert-birthday")[0].innerHTML = `<strong>Invalid</strong> Invalid birthday format dd/mm/yyyy`;
    document.getElementsByName("alert-birthday")[0].style.display = "block";
    return false;
  }
  else if(isDateGreater(birthday, substr) == 1){
    document.getElementsByName("alert-birthday")[0].innerHTML = `<strong>Invalid</strong> Birthday must less than current day`;
    document.getElementsByName("alert-birthday")[0].style.display = "block";
    return false;
  }
  else{/* toggle alert */
    document.getElementsByName("alert-birthday")[0].style.display = "none";
    return true;
  }
}