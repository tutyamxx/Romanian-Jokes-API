<p align="center">
  <img src="https://raw.githubusercontent.com/tutyamxx/Romanian-Jokes-API/master/joke.png" widht="100" height="100"><br/>
</p>

# Romanian Jokes API 👌😹 
 * Just a dumb API which returns dumb romanian jokes made when I died of boredom
 * I need to add more dumb jokes and new things in the future

# How to run it locally
* Clone this repo
* Open the containing folder
* Type **npm i && npm start**
* Open the API in your browser http://localhost:3000/api/

# Usage

* Live API URL hosted on heroku ➡️ https://romanian-jokes-api.herokuapp.com/api/

Endpoints | Result | URL Usage Example |
---------- | --- | ------------ |
/api/ | Test if the API runs | <a href="https://romanian-jokes-api.herokuapp.com/api/">Click Here!</a> |
/api/romanianjokes | Get a random romanian joke | <a href="https://romanian-jokes-api.herokuapp.com/romanianjokes">Click Here!</a> |
/api/romanianjokes/all | Get all the jokes | <a href="https://romanian-jokes-api.herokuapp.com/api/romanianjokes/all">Click Here!</a> |
/api/romanianjokes/categories | Get all the joke types so you can use them in filtering | <a href="https://romanian-jokes-api.herokuapp.com/api/romanianjokes/categories">Click Here!</a> |
/api/romanianjokes/:id | Get a specific romanian joke | <a href="https://romanian-jokes-api.herokuapp.com/api/romanianjokes/30">Click Here!</a> |
/api/romanianjokes/filter/:joketype | Get all the jokes filtered by a joke type | <a href="https://romanian-jokes-api.herokuapp.com/api/romanianjokes/filter/seci">Click Here!</a> |
/api/romanianjokes/filter/:joketype/random | Get a random joke filtered by a joke type | <a href="https://romanian-jokes-api.herokuapp.com/api/romanianjokes/filter/seci/random">Click Here!</a> |

# For consuming

* Rule is simple, jokes are returned in JSON format
* Long jokes tend to have new line separators ➡️ \\n
* To implement it in your bot, website, widget and add formatting, simply search and replace the new line separators in string with your custom formatting.

# Some random API result example

![Example result](https://github.com/tutyamxx/Romanian-Jokes-API/blob/master/randomjokeresult.PNG)
