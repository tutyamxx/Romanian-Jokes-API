# Romanian Jokes API 👌😹 
 * Just a dumb API which returns dumb romanian jokes made when I died of boredom
 * I need to add more dumb jokes and new things in the future
 * I might host it somewhere someday.

# How to run it
* Clone this repo
* Open the containing folder
* Type **npm i && npm start**
* Open the API in your browser http://localhost:3000/api/

# Usage

Endpoints | Result | URL Usage Example |
---------- | --- | ------------ |
/api/ | Test if the API runs | https://{url}/api/ |
/api/romanianjokes | Get a random romanian joke | https://{url}/api/romanianjokes |
/api/romanianjokes/all | Get all the jokes | https://{url}/api/romanianjokes/all |
/api/romanianjokes/:id | Get a specific romanian joke | https://{url}/api/romanianjokes/30 |
/api/romanianjokes/filter/:joketype | Get all the jokes filtered by a joke type | https://{url}/api/romanianjokes/filter/seci |
/api/romanianjokes/filter/:joketype/random | Get a random joke filtered by a joke type | https://{url}/api/romanianjokes/filter/seci/random |

# For consuming

* Rule is simple, jokes are returned in JSON format
* To implement it in your bot, website, widget and add formatting, simply search by the new line in string and replace it with your formatting. "\n"

# See example

![Example result](https://github.com/tutyamxx/Romanian-Jokes-API/blob/master/randomjokeresult.PNG)
