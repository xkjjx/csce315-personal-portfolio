let theme = localStorage.getItem("theme");
if(theme === null){
    theme = "light";
}
if(theme === "dark"){
    setDarkTheme();
}
else{
    setLightTheme();
}

let currentDate = new Date();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();
let ampm = hours >= 12 ? 'PM' : 'AM';
if(hours > 12){
    hours -= 12;
}

let time = hours + ":" + minutes + " " + ampm;
scrollerTxt = "Your time : " + time;
console.log(time);
// document.getElementById("weatherHeader").innerHTML = scrollerTxt;



function setDarkTheme(){
    document.getElementById("stylesheet").href = "dark_styles.css";
    theme = "dark";
    localStorage.setItem("theme", "dark");
}

function setLightTheme(){
    document.getElementById("stylesheet").href = "styles.css";
    theme = "light";
    localStorage.setItem("theme", "light");
}

function setDarkButtonStyle(){
    document.getElementById("night_mode_svg").className.baseVal = "swapped";
    document.getElementById("night_mode_svg").className.animVal = "swapped";
}

function setLightButtonStyle(){
    document.getElementById("night_mode_svg").className.baseVal = "";
    document.getElementById("night_mode_svg").className.animVal = "";
}

function switchStyles(){    
    if (document.getElementById("stylesheet").href.split("/").pop() === "dark_styles.css"){
        setLightTheme();
    }
    else if (document.getElementById("stylesheet").href.split("/").pop() === "styles.css"){
        setDarkTheme();
    }
}

function switchButtonStyle(){
    if (document.getElementById("night_mode_svg").className.baseVal === ""){
        setDarkButtonStyle();
    }
    else if (document.getElementById("night_mode_svg").className.baseVal === "swapped"){
        setLightButtonStyle();
    }
}

const root = document.documentElement;
 
document.addEventListener('mousemove', evt => {
    let x = evt.clientX / innerWidth;
    let y = evt.clientY / innerHeight;
 
    root.style.setProperty('--mouse-x', x);
    root.style.setProperty('--mouse-y', y);
});