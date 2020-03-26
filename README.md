# Coronews - API week project

Our task this week was to build a simple, single-page web app. We were required to query at least two APIs and use the results to update the DOM.

We initially reviewed a few API's that took our interest. Eventually we settled on a weather API and a news API, as they looked like they were simple, tried-and-tested options.

Given that it's such a relevant topic, we decided to create a web-page that would allow a user to get quickly updated on the latest Coronavirus news. We sketched out a simple page design, with the current weather featuring on the top of the page in an expandable toolbar, and below a list of news summaries:

![sketch of our proposed app](https://i.imgur.com/43qUCO3.png)
(sketch of our proposed app)

## User Journey

1. Scope: We decided that the webpage would consist of a dynamically generated list of news articles and a simple banner at the top of the page for weather updates.
2. Personas: We considered that a typical person using the app would be someone like ourselves - someone who wanted to be quickly updated on the changing state of the Coronavirus outbreak.
3. User Expectations/Scenario: We anticipated that the user would want to be able to click to the full articles of the news previews we provided and would benefit from seeing headlines and available images from the news articles.
4. Touchpoints - User interactions with the app would be limited to expanding the weather banner and clicking links


## Getting started:

### CORS:

Our initial reviews of our chosen API's suggested that there wouldnt be any issues with CORS, but we hadn't realised that in order to use the https protocol we would need to pay for the premium version of the software.

We received an error, relating to insecure http resources, in our console when we tried to access our webpage, published via Git Pages:

![Insecure http resource](https://i.imgur.com/9z3HxzD.png)

In order to get around this we used a proxy server, which took the API information from an http url, and sent it on to us with the https protocol. This allowed the information to be received to our webpage by our Chrome browser.

![WeatherStack's documentation](https://i.imgur.com/LaesdXT.png)

### Rate Limits and API keys:

We assumed we'd need a rate limit of at least a few dozen an hour, as we would need to make get requests quite frequently to enable us to trial our code. WeatherStack permitted 1000/month, which would be ample for our needs:

![weatherstack rate limits](https://i.imgur.com/UOdLxzJ.png)

The access key was available with a simple registration.

### oAuth - WHAT ARE WE MEANT TO DO WITH THIS?

From our brief:
> - Are you able to use the API without user authentication (oAuth)?


### Documentation

The WeatherStack documentation appeared to be very comprehensive (although failed to communicate to us that we would need a workaround for the CORS issue). Generally, set-up was very easy and efficient.

## Website Features

The app featured an expandable weather update, and a dynamically generated list of news article summaries:

![expandable weather update](https://i.imgur.com/XCHIAL2.png)
(expandable weather update)

![list of news article summaries](https://i.imgur.com/Fhn36bX.png)
(list of news article summaries)

## FOLLOW UP QUESTIONS

- *If using a private API key, you won't be able to deploy to GitHub pages this week (if you're not using an API key, go for it!)*
- *Try and do a little bit of TDD in pairs*
- *Code: break your JavaScript down into small functions with a clear input and output; this will make it easy to write tests*
- *Tests: write tests for your pure functions. We don't expect tests on the DOM or on the response from an API.*
- **Oauth - I have a shallow understanding of this**
- **CORS - I have a shallow understanding of this**
- **Is there a good example of a user journey for these projects? The ones I find online are for much more complex apps.**
- Take appropriate measures when it comes to [concealing private information](https://gist.github.com/derzorngottes/3b57edc1f996dddcab25) (i.e. your API key!) **Suggest this is highlighted to us before the projects are started.**
