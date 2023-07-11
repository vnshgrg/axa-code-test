# 📜 AXA Code Test Assignment

This repository is the requested code test assignment where registered users (child less than 10 years old) can write wishes in the form of messages to Santa Clause. Regardless of the result I will be thanful for this opportunity.

## Backend
Backed code is using `Express.js` framework. The backend server currently serves two endpoints.

```
GET / serves a static build of frontend React app
```

```
POST /api/message a REST API endpoint to send message to Santa
```
The above post method requires two parameters.
```
username: String! username registered to service (currently a username in the mock JSON data)
message: String! free text which will be sent to Santa clause as wish
```

### EmailDatabase
The backend server was also required to store email requests in an in-memory database and periodically (every 15 seconds to be exact) send pending emails in the database to Santa Clause (for this purpose this assignment required to send email to a give email address via Ethereal SMTP server.)

I have built a JavaScript Class to be used as the in-memory database with various methods. Which is instansiated once when the server is ran and shares the state throught the lifecycle of the app. The database also has a mechanicsm to lock or unlock itself. This is not a hard-lock but it means that which the emails are being processed (asynchronosly) it will set itself in locked state, which will not allow further cron jobs to retrieve the list of pending emails. While the emails are being processed there is a possibility of new incomming message requests which will not be affected by the database's locked state. The email requests that have been added while the emails were being processed and the database was in locked state, they will be processed in next cron job after completing the current job and the database is unlocked.

### Periodically process the emails
The assignment mentions that the emails from the in-memory database shall be processed every 15 seconds, where all the pending email requests shall be sent to the desired email address. This kind of operations are mostly used as cron jobs, but given the simple nature of the assignment I opted in to build a basic interval based function immitating cron like features. This is achieved via built-in `setInterval` function.

### SMTP Mailer
This assignment also had specific requirement about where and how to send the emails when they are being processed. I have used a popular node.js library called `nodemailer`. After signing up for the Ethereal service to obtain my free test SMTP server account. I set up the nodemailer's SMTP transport to use Ethereal SMTP servers to send the email to Santa Clause.

## FrontEnd
Frontend is written React with hooks and functional components. The requirement for the frontend was not focused on UI but was rather focused on functionality. The frontend app has a single page with a form that accepts `username` and `message`. The labels have been kept as close to the sample code provided with the assignment. This page is served in the root of the app `/` and once submitting the form the React app makes a POST api call to `/api/message` with values provided in the form. The form elements such as input and buttons are disabled while api request is happening and the form also have some basic validation where if `username` and/or `message` isn't provided then it displays an error at the top of the form. Once the api request is completed if there was an error then it will display the error with the message received from the API response or it the request succeeded then success message displayed.

## Run this project
This project can be cloned from GitHub.
```
$ git clone https://github.com/vnshgrg/axa-code-test.git project-name
$ cd project-name
$ npm install
```

To run the project in development environment
```
$ npm run dev
```

To build and serve the production build
```
$ npm run postinstall
$ npm start
```
