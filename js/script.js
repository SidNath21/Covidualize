let topic = document.querySelector(".topic");
let covidData;
let country;
let date;

let globalTotalCases, globalTotalDeaths, globalTotalRecovered, dailyGlobalCases, dailyGlobalDeaths, dailyGlobalRecovered;

let totalCases = document.querySelector(".total-cases");
let totalDeaths = document.querySelector(".total-deaths");
let totalRecovered = document.querySelector(".total-recovered");
let dailyCases = document.querySelector(".daily-cases");
let dailyDeaths = document.querySelector(".daily-deaths");
let dailyRecovered = document.querySelector(".daily-recovered");

let generateData = document.querySelector("#submit");
let textForm = document.querySelector("#form");

let cname = document.querySelector(".countryName");
let cdata = document.querySelector(".countryData");



generateData.addEventListener("click", function(){
  country = textForm.elements["title"].value;
  if(country.toLowerCase() == "global"){
    updateTitle("Global");
    updateNums(globalTotalCases, globalTotalDeaths, globalTotalRecovered, dailyGlobalCases, dailyGlobalDeaths, dailyGlobalRecovered);
  }
  else{
    getCountryData(country);
  }
});

generateData.addEventListener("touchstart", function(){
  country = textForm.elements["title"].value;
  if(country.toLowerCase() == "global"){
    updateTitle("Global");
    updateNums(globalTotalCases, globalTotalDeaths, globalTotalRecovered, dailyGlobalCases, dailyGlobalDeaths, dailyGlobalRecovered);
  }
  else{
    getCountryData(country);
  }
});


function getCountryData(country){

  let ID = getCountryID(country);
  if (ID < 0) alert("Choose A Valid Country!");
  
  else{
    
    let countryTotalCases = covidData[ID]["TotalConfirmed"];
    let countryTotalDeaths = covidData[ID]["TotalDeaths"];
    let countryTotalRecovered = covidData[ID]["TotalRecovered"];
    let countryDailyCases = covidData[ID]["NewConfirmed"];
    let countryDailyDeaths = covidData[ID]["NewDeaths"];
    let countryDailyRecovered = covidData[ID]["NewRecovered"];

    updateTitle(covidData[ID].Country);
    updateNums(countryTotalCases, countryTotalDeaths, countryTotalRecovered , countryDailyCases, countryDailyDeaths, countryDailyRecovered);

  }
}

function getCountryID(country){

  if(country.toLowerCase() == "usa") return 177;
  
  for (let i=0; i<covidData.length; i++){
    
    if(country.toLowerCase() == covidData[i].Country.toLowerCase() || country.toLowerCase() == covidData[i].CountryCode.toLowerCase()){
      return i;
    }
    
  }
  return -1;
}


function updateTitle(str){
  topic.innerHTML = str + " | " + date;
}

function updateNums(totCases, totDeaths, totRecovered, dayCases, dayDeaths, dayRecovered){
  totalCases.innerHTML = totCases;
  totalDeaths.innerHTML = totDeaths;
  totalRecovered.innerHTML = totRecovered;
  dailyCases.innerHTML = dayCases;
  dailyDeaths.innerHTML = dayDeaths;
  dailyRecovered.innerHTML = dayRecovered;
}


function getData(){

  fetch("https://api.covid19api.com/summary")
  .then(function(response) { return response.json() })
  .then(function(data) {


    let globalData = data["Global"];

    globalTotalCases = globalData["TotalConfirmed"];
    globalTotalDeaths = globalData["TotalDeaths"];
    globalTotalRecovered = globalData["TotalRecovered"];
    dailyGlobalCases = globalData["NewConfirmed"];
    dailyGlobalDeaths = globalData["NewDeaths"];
    dailyGlobalRecovered = globalData["NewRecovered"];

    date = data["Date"].substr(0, 10);

    covidData = data["Countries"];

    cname.textContent = "Global Cases"
    cdata.textContent = globalTotalCases
    updateTitle("Global");
    updateNums(globalTotalCases, globalTotalDeaths, globalTotalRecovered, dailyGlobalCases, dailyGlobalDeaths, dailyGlobalRecovered);


  })
  .catch(function(){
    console.log("error");
  })

}




window.onload = function (){ 
  this.getData(); 
}