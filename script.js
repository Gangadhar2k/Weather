const input = document.querySelector("#search_input");
const search_btn = document.querySelector("#search_btn");
const input_form = document.querySelector("#input_form");
const url = "https://api.weatherapi.com/v1/current.json?key=";
const apiKey = "";   //enter your api key here to get visit https://www.weatherapi.com/
input_form.addEventListener("submit", getData);

async function getData(e) {
    let data;
  e.preventDefault();

  
  try {
    const city = input.value.trim();
    const fetchDetail = await fetch(url + apiKey + "&q="+city +"&aqi=no");
    data = await fetchDetail.json();
    document.querySelector("#city_name").innerText = data.location.name;
    document.querySelector("#weather_temp").innerText =
     data.current.temp_c + "°C";
    document.querySelector("#weather_img").src = data.current.condition.icon;
    document.querySelector("#weather_img").alt=data.current.condition.text;
    document.querySelector("#city_hum").innerText = data.current.humidity + "%";
    document.querySelector("#city_wind").innerText =
      data.current.wind_kph + "kmph";
    document.querySelector(".content").style.display = "block";
    document.querySelector(".error>p").style.display="none";
    console.log(data);
  } 
  catch (error) {
        console.log(error);
        // removing the previous weather
        document.querySelector(".content").style.display="none";

        if(document.querySelector(".error>p").innerText = data.error.code==1003){
            document.querySelector(".error>p").innerText ="Please enter a location";
        }
        else{  
            document.querySelector(".error>p").innerText = data.error.message;
        }
        // removing the current error
        document.querySelector(".error>p").style.display="block";
        document.querySelector(".error>p").innerText = data.error.message;
  }
}
