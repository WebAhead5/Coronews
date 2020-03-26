

//variables-----------------------------------------------------------------------------------------------------------------------------

//articles-------------------------------------------------------------------------
var articlesApi = {
    url: "https://newsapi.org/v2",
    apiKey: "9de2a3c2532845628d72a2c8e8d26c15",
    sortOptions: { recent: "publishedAt", popularity: "popularity" },
    selectedSortOption: "publishedAt",
    default_article_topic: "corona COVID-19",
    getUrl: function (searchQ) {
        return `${articlesApi.url}/everything?q=${searchQ}&sortBy=${articlesApi.selectedSortOption}&language=en&apiKey=${articlesApi.apiKey} +`
    }

};
var elements_articlesContainer = document.getElementById("articlesContainer");

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
    apiKey: "93247677e13a4c3f97bba1e28ba8bde0",
    getUrl: function (searchQ) {
        return `${searchAPI.url}?query=${searchQ}`
    }
};
let element_searchInputField = document.getElementById("searchBarInput");
let element_searchSuggestionsContainer = document.getElementById("searchSuggestions");
let element_searchSortByRecent = document.getElementById("sortByRecent");
let element_searchSortByPopularity = document.getElementById("sortByPopularity");

//functions-----------------------------------------------------------------------------------------------------------------------------
function fetchJsonData(url, funcToApply) {
    fetch(url)
        .then(url => url.json())
        .then(jsonObj => {
            funcToApply(jsonObj)
            console.log(url)
        })
        .catch(e => console.error(e));
}
let suggestionsDelayTimeInMS = 300;
//articles-------------------------------------------------------------------------

function generateArticleDiv(article) {

    let divContainer = document.createElement("div");


    divContainer.innerHTML +=
        `
<div class="articleImgAndTextContainer">
    
    <div class="articleTextContainer">
        <p class="articleTitle">${article.title}</p>
        <p class="articleDesc">${article.description} </p>    
    </div>

    <img src="${ (!article.urlToImage || article.urlToImage === "https:" ? "./resources/img-icon-globe.svg" : article.urlToImage) }" 
    onerror="this.onerror=null; this.src='./resources/img-icon-globe.svg';"  alt="article image">
    
</div>

<div class="articleFooterBar">
    <span>${article.source.name} - ${generateDateString(article.publishedAt)}</span>  
</div>
`;



    divContainer.classList.add("articleHolder");
    divContainer.classList.add("shadowBox");

    divContainer.addEventListener("click", ()=> window.open(article.url, '_blank'));
    return divContainer;
}
function generateDateString(jsonDateFormat) {

    let articleTime = new Date(jsonDateFormat);
    let Difference_In_Time = new Date(Date.now()).getTime() - articleTime;
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    let Difference_In_Hrs = Difference_In_Time/(1000*3600) ;
    let Difference_In_mins = Difference_In_Time/(1000*60) ;


    if (Difference_In_Days >= 10) //more than one day
        return articleTime.toDateString();

    if (Difference_In_Days > 2)
        return parseInt(Difference_In_Days) + " days ago";

    if (Difference_In_Days >= 1)
        return "yesterday";

    if (Difference_In_Hrs > 1)
    {
        let intHrs = parseInt(Difference_In_Hrs );
        return intHrs + (intHrs ===1? " hour ago" : " hours ago");
    }

    let intMins = parseInt(Difference_In_mins);
    return  intMins + (intMins ===1? " minute ago" : " minutes ago");


}


function loadArticles(searchStr) {
    fetchJsonData(articlesApi.getUrl(encodeURI(searchStr)), jsonObj => {

        elements_articlesContainer.innerHTML = "";
        if(jsonObj.articles.length === 0){
            let element_noArticleFound = document.createElement("p");
            element_noArticleFound.classList.add("noArticleFound");
            elements_articlesContainer.appendChild(element_noArticleFound)
        }
        jsonObj.articles.forEach(article => {
            let newElement = generateArticleDiv(article);
            elements_articlesContainer.appendChild(newElement);
        });


    });
}
loadArticles(articlesApi.default_article_topic);

//weather--------------------------------------------------------------------------
fetchJsonData(weatherAPI.getUrl("Haifa"), jsonObj => {
    //console.log(jsonObj)
    elements_currentTemp.textContent += jsonObj.current.temperature + "°C";
    elements_feelslike.textContent += jsonObj.current.feelslike + "°C";
    elements_humidity.textContent += jsonObj.current.humidity + "%";
    elements_wind.textContent += jsonObj.current.wind_speed + "km/hr";
    elements_precipitation.textContent += jsonObj.current.precip + "mm";
    elements_weathericon.style.backgroundImage = `url(${jsonObj.current.weather_icons[0]})`
    document.getElementById("weathericon").classList.toggle("lds-ring");
})
elements_weatherContainer.addEventListener("click", () => {
    elements_weatherPanel.classList.toggle("show");
    elements_weatherPanel.classList.toggle("active")
    document.getElementById("credits").classList.toggle("hidden");
})


//search=-------------------------------------------------------------------------

element_searchInputField.addEventListener("input", onInputChange);
function onInputChange() {

    let str = element_searchInputField.value;

    if (!str || str.trim() === "")
        str = articlesApi.default_article_topic;

    // let currentTime = Date.now();
    if (intervalID) {
        clearInterval(intervalID);
        console.log("cleared")
    }
    intervalID = setInterval(() => {

        getSuggestions(str);
        loadArticles(str);

        let temp = intervalID;
        intervalID = null;
        clearInterval(temp);

    }, suggestionsDelayTimeInMS);


}

let intervalID;
function getSuggestions(str) {

    fetchSuggestionData(searchAPI.getUrl(str), jsonObj => {
        // text = `{result:${text}}`;
        if (!jsonObj.suggestionGroups || jsonObj.suggestionGroups.length === 0) {
            element_searchSuggestionsContainer.innerHTML = "";
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
function fetchSuggestionData(url, funcToApply) {

    const myRequest = new Request(url, {
        method: 'GET',
        headers: { "Ocp-Apim-Subscription-Key": "93247677e13a4c3f97bba1e28ba8bde0" },
    });

    fetch(myRequest)
        .then(response => response.json())
        .then(Obj => {
            console.log(Obj);
            funcToApply(Obj);
        })
        .catch(e => console.error(e));
}


element_searchSortByPopularity.addEventListener("click", () => OnSortChange(articlesApi.sortOptions.popularity));
element_searchSortByRecent.addEventListener("click", () => OnSortChange(articlesApi.sortOptions.recent));

function OnSortChange(sortOption) {
    articlesApi.selectedSortOption = sortOption;

    let str = element_searchInputField.value;

    if (!str || str.trim() === "")
        str = articlesApi.default_article_topic;

    loadArticles(str);
};

//Graphs-------------------------------------------------------------------------

document.getElementById('graphcontainer').addEventListener('click', () => {
    document.getElementById('graphpanel').classList.toggle("show");
    document.getElementById('graphpanel').classList.toggle("active");
})
