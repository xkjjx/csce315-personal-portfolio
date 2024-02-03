function hideNavbar() {
    document.getElementById("nav").style.display = "none";
}
  
  let theme = localStorage.getItem("theme");
  if(theme === null){
      theme = "light";
  }
  
  let mainTheme = localStorage.getItem("mainTheme");
  if (mainTheme === null){
      mainTheme = "first";
      localStorage.setItem("mainTheme", "first");
  }
  if(theme === "dark"){
      if(mainTheme === "first"){
          setMainDarkTheme();
      }
      else{
          setSecondDarkTheme();
      }
  }
  else{
      if (mainTheme === "first"){
          setMainLightTheme();
      }
      else{
          setSecondLightTheme();
      }
  }
setCollegeStationWeather();
  
//   function setMainTheme(){
//     document.getElementById("footerSecond").display = "none";
//     document.getElementById("footerFirst").display = "block";
//     console.log("setMainTheme")
//     console.log(document.getElementById("footerFirst").display);
//     console.log(document.getElementById("footerSecond").display);

//   }

//   function setSecondTheme(){
//     document.getElementById("footerFirst").display = "none";
//     document.getElementById("footerSecond").display = "block";
//   }
  
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  if(hours > 12){
      hours -= 12;
  }
  
  if (minutes < 10) {
      minutes = '0' + minutes;
  }
  
  let time = hours + ":" + minutes + " " + ampm;
  scrollerTxt = "Your time : " + time;
  console.log(time);
  // handlePermission();
  // document.getElementById("weatherHeader").innerHTML = scrollerTxt;
  
  
  
  function setMainDarkTheme(){
      document.getElementById("stylesheet").href = "dark_styles1.css";
      document.getElementById("darkModeToggle").innerHTML = "";
      theme = "dark";
      mainTheme = "first";
      localStorage.setItem("theme", "dark");
  }
  
  function setMainLightTheme(){
      document.getElementById("stylesheet").href = "styles1.css";
      document.getElementById("darkModeToggle").innerHTML = "";
      theme = "light";
      mainTheme = "first";
      localStorage.setItem("theme", "light");
  }
  
  function setSecondDarkTheme(){
      document.getElementById("stylesheet").href = "dark_styles2.css";
      document.getElementById("darkModeToggle").innerHTML = "&nbsp;Light Mode";
      theme = "dark";
      mainTheme = "second";
      localStorage.setItem("theme", "dark");
  }
  
  function setSecondLightTheme(){
      document.getElementById("stylesheet").href = "styles2.css";
      document.getElementById("darkModeToggle").innerHTML = "&nbsp;Dark Mode";
      theme = "light";
      mainTheme = "second";
      localStorage.setItem("theme", "light");
  }
  
  function format24HRto12HR(strin){
      let hours = strin.split(":")[0];
      hours = parseInt(hours);
      let minutes = strin.split(":")[1];
      let ampm = hours >= 12 ? 'PM' : 'AM';
      if(hours >= 13){
          hours -= 12;
      }
      else if(hours === 0){
          hours = 12;
      }
      return hours + ":" + minutes + " " + ampm;
  }
  
function switchStyles(){
if (mainTheme === "first"){
    if (theme === "light"){
        theme = "dark";
        localStorage.setItem("theme", "dark");
        setMainDarkTheme();
    }
    else{
        theme = "light";
        localStorage.setItem("theme", "light");
        setMainLightTheme();
    }
}
else{
    if (theme === "light"){
        localStorage.setItem("theme", "dark");
        theme = "dark";
        setSecondDarkTheme();
    }
    else{
        theme = "light";
        localStorage.setItem("theme", "light");
        setSecondLightTheme();
    }
}
}
  
  
  const root = document.documentElement;
   
  document.addEventListener('mousemove', evt => {
      let x = evt.clientX / innerWidth;
      let y = evt.clientY / innerHeight;
   
      root.style.setProperty('--mouse-x', x);
      root.style.setProperty('--mouse-y', y);
  });
  
  
  function getCollegeStationWeather() {
      return fetch("https://api.open-meteo.com/v1/forecast?latitude=30.628&longitude=-96.3344&current=temperature_2m,weather_code&daily=sunrise,sunset&temperature_unit=fahrenheit&timezone=America/Chicago")
        .then(response => response.json())
        .then(data => {
          console.log("temperature_2m: ", data.current.temperature_2m );
          console.log("sunrise: ", data.daily.sunrise[0].slice(-5));
          console.log("sunset: ", data.daily.sunset[0].slice(-5));
          let wmo_code = data.current.weather_code;
          if (wmo_code < 10){
              wmo_code = "0" + wmo_code;
          }
          console.log(data);
          return {temp: data.current.temperature_2m, sunrise: data.daily.sunrise[0].slice(-5), sunset: data.daily.sunset[0].slice(-5), conditions: wmoCodes[wmo_code]};
          //return data; // Return the data for further use if needed
        })
        .catch(error => console.error("Error fetching weather data:", error));
  }
  
  
  // function getWeatherByCoordinates(latitude,longitude){
  
  //     return fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m&temperature_unit=fahrenheit")
  //       .then(response => response.json())
  //       .then(data => {
  //         // Display current weather
  //         console.log(data);
  //         return data.current.temperature_2m + "°F";
  //         //return data; // Return the data for further use if needed
  //       })
  //       .catch(error => console.error("Error fetching weather data:", error));
  // }
  
  // function setUserWeather(){
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //         console.log("Latitude is :", position.coords.latitude);
  //         console.log("Longitude is :", position.coords.longitude);
  //         getWeatherByCoordinates(position.coords.latitude,position.coords.longitude).then(data => {
  //             console.log(data);
  //             scrollerTxt = "Welcome to my website! | Your time : " + time + " | Weather at your location : " + data;
  //             document.getElementById("weatherHeader").innerHTML = scrollerTxt;
  //         });
  //     });
  // }
  
  
  // function handlePermission() {
  //     navigator.permissions.query({name:'geolocation'}).then(function(result) {
  //       if (result.state == 'granted') {
  //         setUserWeather();
  //         report(result.state);
  //       } else if (result.state == 'prompt') {
  //         report(result.state);
  //         setUserWeather();
  //       } else if (result.state == 'denied') {
  //         report(result.state);
  //       }
  //       result.onchange = function() {
  //         report(result.state);
  //       }
  //     });
  // }
  
  // function report(state) {
  //     console.log('Permission ' + state);
  //   }
  
  // function getCoordinates(){
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //         console.log("Latitude is :", position.coords.latitude);
  //         console.log("Longitude is :", position.coords.longitude);
  //     });
  // }
  // // Call the function to get weather data
  function setCollegeStationWeather(){
      getCollegeStationWeather().then(data => {
          scrollerTxt = " Welcome to My Website! | Your time : " + time + " | College Station Temperature : " + data.temp + "°F | Sunrise : " + format24HRto12HR(data.sunrise) + " | Sunset : " + format24HRto12HR(data.sunset) + " | " + data.conditions + " |";
          document.getElementById("weatherHeader").innerHTML = scrollerTxt.repeat(200);
      });
  }


  function toggleThemes(){
    if (mainTheme === "first"){
        if( theme === "light"){
            setSecondLightTheme();
        }
        else{
            setSecondDarkTheme();
        }
        localStorage.setItem("mainTheme", "second");
    }
    else{
        if( theme === "light"){
            setMainLightTheme();
        }
        else{
            setMainDarkTheme();
        }
        localStorage.setItem("mainTheme", "first");
    }
  }
  
  const wmoCodes =
  {
      "00": "Clear sky",
      "01": "Clouds dissolving",
      "02": "Partly cloudy",
      "03": "Clouds forming",
      "04": "Reduced visibility due to smoke",
      "05": "Haze",
      "06": "Dust in suspension",
      "07": "Dust or sand raised by wind",
      "08": "Well-developed dust or sand whirls",
      "09": "Duststorm or sandstorm",
      "10": "Mist",
      "11": "Patches of shallow fog or ice fog",
      "12": "Continuous shallow fog or ice fog",
      "13": "Visible lightning, no thunder",
      "14": "Non-reaching precipitation in sight",
      "15": "Distant precipitation reaching ground",
      "16": "Nearby precipitation reaching ground",
      "17": "Thunderstorm without precipitation",
      "18": "Squalls",
      "19": "Funnel clouds",
      "20": "Drizzle or snow grains",
      "21": "Light rain",
      "22": "Snow",
      "23": "Rain and snow or ice pellets",
      "24": "Freezing drizzle or freezing rain",
      "25": "Rain shower(s)",
      "26": "Snow shower(s) or rain and snow",
      "27": "Hail shower(s) or rain and hail",
      "28": "Fog or ice fog",
      "29": "Thunderstorm (no precipitation)",
      "30": "Slight/moderate duststorm or sandstorm (decreasing)",
      "31": "Slight/moderate duststorm or sandstorm (no change)",
      "32": "Slight/moderate duststorm or sandstorm (increasing)",
      "33": "Severe duststorm or sandstorm (decreasing)",
      "34": "Severe duststorm or sandstorm (no change)",
      "35": "Severe duststorm or sandstorm (increasing)",
      "36": "Slight/moderate drifting snow",
      "37": "Heavy drifting snow",
      "38": "Slight/moderate blowing snow",
      "39": "Heavy blowing snow",
      "40": "Distant fog or ice fog",
      "41": "Patches of fog or ice fog",
      "42": "Thinning fog or ice fog (sky visible)",
      "43": "Thinning fog or ice fog (sky invisible)",
      "44": "Stable fog or ice fog (sky visible)",
      "45": "Stable fog or ice fog (sky invisible)",
      "46": "Thickening fog or ice fog (sky visible)",
      "47": "Thickening fog or ice fog (sky invisible)",
      "48": "Fog depositing rime (sky visible)",
      "49": "Fog depositing rime (sky invisible)",
      "50": "Drizzle, intermittent, slight",
      "51": "Drizzle, continuous, slight",
      "52": "Drizzle, intermittent, moderate",
      "53": "Drizzle, continuous, moderate",
      "54": "Drizzle, intermittent, heavy",
      "55": "Drizzle, continuous, heavy",
      "56": "Freezing drizzle, slight",
      "57": "Freezing drizzle, moderate/heavy",
      "58": "Rain and drizzle, slight",
      "59": "Rain and drizzle, moderate/heavy",
      "60": "Rain, intermittent, slight",
      "61": "Rain, continuous, slight",
      "62": "Rain, intermittent, moderate",
      "63": "Rain, continuous, moderate",
      "64": "Rain, intermittent, heavy",
      "65": "Rain, continuous, heavy",
      "66": "Freezing rain, slight",
      "67": "Freezing rain, moderate/heavy",
      "68": "Rain or drizzle and snow, slight",
      "69": "Rain or drizzle and snow, moderate/heavy",
      "70": "Intermittent fall of snowflakes, slight",
      "71": "Continuous fall of snowflakes, slight",
      "72": "Intermittent fall of snowflakes, moderate",
      "73": "Continuous fall of snowflakes, moderate",
      "74": "Intermittent fall of snowflakes, heavy",
      "75": "Continuous fall of snowflakes, heavy",
      "76": "Diamond dust",
      "77": "Snow grains",
      "78": "Isolated star-like snow crystals",
      "79": "Ice pellets",
      "80": "Rain shower(s), slight",
      "81": "Rain shower(s), moderate/heavy",
      "82": "Rain shower(s), violent",
      "83": "Shower(s) of rain and snow, slight",
      "84": "Shower(s) of rain and snow, moderate/heavy",
      "85": "Snow shower(s), slight",
      "86": "Snow shower(s), moderate/heavy",
      "87": "Shower(s) of snow pellets or small hail, slight",
      "88": "Shower(s) of snow pellets or small hail, moderate/heavy",
      "89": "Shower(s) of hail, slight",
      "90": "Shower(s) of hail, moderate/heavy",
      "91": "Slight rain - Thunderstorm (no precipitation)",
      "92": "Moderate/heavy rain - Thunderstorm (no precipitation)",
      "93": "Slight snow, or rain and snow mixed or hail - Thunderstorm (no precipitation)",
      "94": "Moderate/heavy snow, or rain and snow mixed or hail - Thunderstorm (no precipitation)",
      "95": "Thunderstorm, slight/moderate, with rain and/or snow",
      "96": "Thunderstorm, slight/moderate, with hail",
      "97": "Thunderstorm, heavy, with rain and/or snow",
      "98": "Thunderstorm combined with dust/sandstorm",
      "99": "Heavy thunderstorm with hail"
    }
    