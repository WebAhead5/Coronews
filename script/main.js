

var articlesApi ={
    url: "https://newsapi.org/v2",
    apiKey : "9de2a3c2532845628d72a2c8e8d26c15",
    getUrl: function (searchQ) {
        return `${articlesApi.url}/everything?q=${searchQ}&apiKey=${articlesApi.apiKey} +`
    }
};
var weatherAPI = {
    proxyurl2: "https://agile-waters-87216.herokuapp.com/",
    url: "http://api.weatherstack.com/",
    apiKey: "917ac2461ccf86560369f3f51787b766",
    getUrl: function (searchQ) {
        return `${weatherAPI.proxyurl2}${weatherAPI.url}current?query=${searchQ}&access_key=${weatherAPI.apiKey}`
    },
    exampleLink: "https://api.weatherstack.com/current?query=London&access_key=917ac2461ccf86560369f3f51787b766"   
}

var elements_weatherContainer = document.getElementById("weatherContainer");
var elements_weatherPanel = document.getElementById("weatherpanel")
var elements_articlesContainer = document.getElementById("articlesContainer");
var elements_weathericon = document.getElementById("weathericon");
var elements_currentTemp = document.getElementById("currentTemp");
var elements_feelslike = document.getElementById("feelslike");
var elements_humidity = document.getElementById("humidity");
var elements_wind = document.getElementById("wind");
var elements_precipitation = document.getElementById("precipitation");

function fetchJsonData(url, funcToApply) {
    fetch(url)
        .then(url=> url.json())
        .then(jsonObj=> {
            funcToApply(jsonObj)
            console.log(url)
        })
        .catch(e=> console.error(e));
}


function generateArticleDiv(article) {

    let divContainer = document.createElement("div");
    divContainer.innerHTML+=
        `
    <div class="articleImgAndTextContainer">
        
        <div class="articleTextSection">
            <h3>${article.title}</h3>
            <p class="articleDesc">${article.description} <a href="${article.url}">Read More...</a> </p>    
        </div>

        <img src="${article.urlToImage}" alt="">
    </div>
    
    <div clss="articleFooterBar">
        <span>${article.source.name} - ${ generateDateString(article.publishedAt)}</span>  
    </div>
`;


    divContainer.classList.add("articleHolder");
    divContainer.addEventListener("click", ()=> {
        // let element =Array.from(divContainer.childNodes).indexOf(x=>x.classList.contains("articleDesc"));
        let element= divContainer.getElementsByClassName("articleDesc")[0];
        console.log(element)

        element.classList.toggle("hidden")
    });
    return divContainer;
}
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function generateDateString(jsonDateFormat){

    let  a = new Date(jsonDateFormat);
    let b =new Date(Date.now());

   //  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
   //  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
   //
   // console.log(Math.floor((utc2 - utc1) / _MS_PER_DAY));
   //
   //
   //  let  diffDays = parseInt((b - a) / _MS_PER_DAY);
   //
   //  console.log(a.getDate(),a.getMonth(),a.getFullYear())
   //  console.log(diffDays)

    return `${a.getDate()}/${a.getMonth()}/${a.getFullYear()}`
}

fetchJsonData(articlesApi.getUrl("coronavirus"), jsonObj=>
{
    jsonObj.articles.forEach(article=>
    {
        let newElement = generateArticleDiv(article);
        elements_articlesContainer.appendChild(newElement);
    });


});

fetchJsonData(weatherAPI.getUrl("Haifa"), jsonObj=>{
    console.log(jsonObj)
    elements_currentTemp.textContent += jsonObj.current.temperature + "°C";
    elements_feelslike.textContent += jsonObj.current.feelslike  + "°C";
    elements_humidity.textContent += jsonObj.current.humidity + "%";
    elements_wind.textContent += jsonObj.current.wind_speed + "km/hr";
    elements_precipitation.textContent += jsonObj.current.precip + "mm";
    elements_weathericon.style.backgroundImage = `url(${jsonObj.current.weather_icons[0]})`
})

elements_weatherContainer.addEventListener("click", ()=>{
    elements_weatherPanel.classList.toggle("show");
    elements_weatherPanel.classList.toggle("active")
}) 