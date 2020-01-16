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
--- | --- | --- |
/api/ | Test if the API runs | http://localhost:3000/api/ |
/api/romanianjokes | Get a random romanian joke | http://localhost:3000/api/romanianjokes |
/api/romanianjokes/:id | Get a specific romanian joke | http://localhost:3000/api/romanianjokes/30 |
/api/romanianjokes/filter/:joketype | Get all the jokes filtered by a joke type | http://localhost:3000/api/romanianjokes/filter/seci |
/api/romanianjokes/filter/:joketype/random | Get a random joke filtered by a joke type | http://localhost:3000/api/romanianjokes/filter/seci/random |

# See example

![Example result](https://github.com/tutyamxx/Romanian-Jokes-API/blob/master/randomjokeresult.PNG)
