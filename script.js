function switchStyles(){    
    if (document.getElementById("stylesheet").href.split("/").pop() === "dark_styles.css"){
        console.log(document.getElementById("stylesheet").href)
        document.getElementById("stylesheet").href = "styles.css";
    }
    else if (document.getElementById("stylesheet").href.split("/").pop() === "styles.css"){
        console.log(document.getElementById("stylesheet").href)
        document.getElementById("stylesheet").href = "dark_styles.css";
    }
}

function switchButtonStyle(){
    if (document.getElementById("night_mode_svg").className.baseVal === ""){
        document.getElementById("night_mode_svg").className.baseVal = "swapped";
        document.getElementById("night_mode_svg").className.animVal = "swapped";
    }
    else if (document.getElementById("night_mode_svg").className.baseVal === "swapped"){
        document.getElementById("night_mode_svg").className.baseVal = "";
        document.getElementById("night_mode_svg").className.animVal = "";
    }
}

const root = document.documentElement;
 
document.addEventListener('mousemove', evt => {
    let x = evt.clientX / innerWidth;
    let y = evt.clientY / innerHeight;
 
    root.style.setProperty('--mouse-x', x);
    root.style.setProperty('--mouse-y', y);
});