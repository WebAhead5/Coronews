

//variables-----------------------------------------------------------------------------------------------------------------------------

//articles-------------------------------------------------------------------------
var articlesApi ={
    url: "https://newsapi.org/v2",
    apiKey : "9de2a3c2532845628d72a2c8e8d26c15",
    getUrl: function (searchQ) {
        return `${articlesApi.url}/everything?q=${searchQ}&sortBy=publishedAt&language=en&apiKey=${articlesApi.apiKey} +`
    }
};
var elements_articlesContainer = document.getElementById("articlesContainer");
let default_article_topic ="corona COVID-19";
//weather--------------------------------------------------------------------------
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
var elements_weathericon = document.getElementById("weathericon");
var elements_currentTemp = document.getElementById("currentTemp");
var elements_feelslike = document.getElementById("feelslike");
var elements_humidity = document.getElementById("humidity");
var elements_wind = document.getElementById("wind");
var elements_precipitation = document.getElementById("precipitation");


//search=-------------------------------------------------------------------------
let searchAPI = {
    url: "https://api.cognitive.microsoft.com/bing/v7.0/suggestions",
    apiKey : "93247677e13a4c3f97bba1e28ba8bde0",

    getUrl: function (searchQ) {
        return `${searchAPI.url}?query=${searchQ}`
    }
};
let element_searchInputField = document.getElementById("searchBarInput");
let element_searchSuggestionsContainer = document.getElementById("searchSuggestions");


//functions-----------------------------------------------------------------------------------------------------------------------------
function fetchJsonData(url, funcToApply) {
    fetch(url)
        .then(url=> url.json())
        .then(jsonObj=> {
            funcToApply(jsonObj)
            console.log(url)
        })
        .catch(e=> console.error(e));
}

//articles-------------------------------------------------------------------------

function generateArticleDiv(article) {

    let divContainer = document.createElement("div");
    divContainer.innerHTML+=
        `
    <div class="articleImgAndTextContainer">
        
        <div class="articleTextContainer">
            <p class="articleTitle">${article.title}</p>
            <p class="articleDesc">${article.description} </p>    
        </div>

        <img src="${article.urlToImage}" alt="">
    </div>
    
    <div class="articleFooterBar">
        <span>${article.source.name} - ${ generateDateString(article.publishedAt)}</span>  
    </div>
`;

    let onSelect = ()=> {
        if(!divContainer.classList.contains("articleHolder-onClick"))
            divContainer.classList.add("articleHolder-onClick")
    };

    let onDeSelect =(e)=>{

        divContainer.classList.remove("articleHolder-onClick");
        window.open(article.url, '_blank');

    };

    divContainer.classList.add("articleHolder");
    divContainer.addEventListener("mousedown",onSelect );
    divContainer.addEventListener("mouseup", onDeSelect);
    // divContainer.addEventListener("onmouseout", onSelectionLeave);

    divContainer.addEventListener("touchstart",onSelect);
    divContainer.addEventListener("touchend",onDeSelect);
    // divContainer.addEventListener("ontouchmove", onSelectionLeave);
    return divContainer;
}
function generateDateString(jsonDateFormat){

    let  articleTime = new Date(jsonDateFormat);
    let now =new Date(Date.now());

    let tenDaysAgo  = new Date(now);
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    let twoDaysAgo  = new Date(now);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    let yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    let hourAgo = new Date(now);
    hourAgo.setHours(hourAgo.getHours() -1);

    console.log({now:now,tenDaysAgo:tenDaysAgo,twoDaysAgo:twoDaysAgo,yesterday,hourAgo:hourAgo,articleTime:articleTime});
    if(articleTime< tenDaysAgo) //more than one day
        return articleTime.toDateString();

    if(articleTime< twoDaysAgo)
        return  articleTime.getDay() +" days ago";

    if(articleTime < yesterday )
        return "yesterday";

    if(articleTime< hourAgo)
        return articleTime.getHours() + " hours ago";

    return articleTime.getMinutes() + " minutes ago"


}


function loadArticles(searchStr){
    fetchJsonData(articlesApi.getUrl(searchStr), jsonObj=>
    {
        elements_articlesContainer.innerHTML = "";
        jsonObj.articles.forEach(article=>
        {
            let newElement = generateArticleDiv(article);
            elements_articlesContainer.appendChild(newElement);
        });


    });
}
loadArticles(default_article_topic);

//weather--------------------------------------------------------------------------
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


//search=-------------------------------------------------------------------------

element_searchInputField.addEventListener("input",onInputChange);
function onInputChange() {
    let str = element_searchInputField.value;
    if(!str || str.trim() === "")
        str = default_article_topic;

    // let currentTime = Date.now();
    if(intervalID ) {
        clearInterval(intervalID);
        console.log("cleared")
    }
    intervalID= setInterval(()=>{

        getSuggestions(str);
        loadArticles(str);

        let temp =intervalID;
        intervalID = null;
        clearInterval(temp);

    },600);


}

let intervalID ;
function getSuggestions(str){

    fetchSuggestionData(searchAPI.getUrl(str),jsonObj=> {
            // text = `{result:${text}}`;
                if(!jsonObj.suggestionGroups || jsonObj.suggestionGroups.length === 0)
                {
                    element_searchSuggestionsContainer.innerHTML="";
                    return;
                }
                jsonObj.suggestionGroups[0].searchSuggestions.forEach(suggestion => {
                    let option = document.createElement("option");
                    option.setAttribute("value", suggestion.displayText);
                    element_searchSuggestionsContainer.appendChild(option)
                });
        }
    )
}
function fetchSuggestionData(url , funcToApply) {

    const myRequest = new Request(url, {
        method: 'GET',
        headers: {"Ocp-Apim-Subscription-Key": "93247677e13a4c3f97bba1e28ba8bde0"},
    });

    fetch(myRequest)
        .then(response=> response.json())
        .then(Obj=> {
            console.log(Obj);
            funcToApply(Obj);
        })
        .catch(e=> console.error(e));
}

//credits-------------------------------------------------------------------------
    document.getElementById("credits").classList.toggle("hidden");

