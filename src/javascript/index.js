const userEmail = document.getElementById("email");
const password = document.getElementById("password");

class AppUser {
    constructor(email, password){
        this.email = email;
        this.password = password
    }
}

function authentication(){
    let appUser = new AppUser(userEmail.value, password.value)
    fetch("https://itenaCloud.com/user",  {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(appUser)
    })
}

const userLogin = async () => {
let response = await authentication()
if(response.ok){
    localStorage.setItem("token", response.JSON().token)
    localStorage.setItem("refreshToken", response.JSON().refreshToken)
    window.open("./main.html")
    }
}

let stat = false;
let statusToogler = document.getElementById("status")
let statusnotification = document.getElementById("statNotification")
let statusChangeNot = document.getElementById("statChangeNotification")
function isReady(){
    if(stat === false){
        stat = true;
        statusnotification.innerHTML = "You are now online to recieve calls."
        statusChangeNot.innerHTML = "Click to go offline."
        
        start()
    } else{
        stat = false;
        statusnotification.innerHTML = "You are offline."
        statusChangeNot.innerHTML = "Click to go online."
        stop();
        
    }
    console.log(stat);
}

statusToogler.addEventListener("click", isReady)


var timeElapsed = 0;
var minute = 0;
var hour = 0;
var myTimer = 0;

function start() {
    myTimer = setInterval(function(){
        if(timeElapsed < 60){
            timeElapsed += 1;
        } else if(timeElapsed = 60 && minute < 59){
            timeElapsed = 0;
            minute += 1
        } else if(minute = 59){
            minute = 0;
            hour += 1;
        }
         document.getElementById("time").innerText = `Active time: ${hour}H:${minute}M:${timeElapsed}S`;
    }, 1000) ;
}
function stop() {
    clearInterval(myTimer);
}
function reset() {
   timeElapsed = 0;
   clearInterval(myTimer);
   myTimer = setInterval(start, 1000);
}

