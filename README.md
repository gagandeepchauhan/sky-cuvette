/*               CUVETTE TECH ( FULL STACK ASSIGNMENT )                       */

It serves a simple job posting platform

/client -  this folder contains the frontend code built using Reactjs
/server -  this folder contains the backend stuff built using nodejs 

server API's are built using the express middleware 

available server routes - 

	1. /get-jobs (GET)     - return all of the jobs stored in DB
	2. /add-job  (POST)    - used to add a job and save it in DB
	3. /get-job/:_id (GET) - it return the job corresponding to the jobId passed as query parameter (_id)

Database Used is - MongoDB

The application is hosted at - firebase (https://sky-cuvette.web.app)

The backend is hosted at - heroku (https://sky-cuvette.herokuapp.com)

(It may be slower to call backend API's since backend is hosted on free Dyno, it got sleep after 30 Min of Inactiveness)