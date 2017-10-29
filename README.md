# HOMR

Homr is a full-stack web application to help users create a home maintenance schedule for recurring tasks and create/send automated reminders to help preserve the value of their home.

Homr provides the user with a centralized place to find:
- An overview of all previously completed upkeep/completion date
- Upcoming tasks
- Upload pictures about specific home maintenance materials


## Built With

- SEAN Stack: PostgreSQL, Express, AngularJS, Node.js
- Additional Modules: Moment.js, Nodemailer
- Angular Material, SweetAlert for styling
- Passport for user authentication
- FileStack API for image uploading/storage
- Google Font for text and icon styling
- Heroku and  POSTGRES Add-On for web deployment

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Please note, data related to the appliance/task cycle are not available for installation. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app.

- [Node.js](https://nodejs.org/en/)
- [AngularJS](https://angularjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](http://expressjs.com/)
- [Angular Material](https://material.angularjs.org/latest/)

### Installing

In a terminal window, navigate to the project folder once saved on your computer.
- Run `npm install`
- Make sure postgreSQL is running in an open terminal window
- `npm start`

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null,
  "phone_number" varchar(10),
  "user_created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "appliances" (
  "appliance_id" serial primary key,
  "appliance_name" varchar(240) not null
);

CREATE TABLE Users_Appliances (
	"usersapp_id" serial primary key,
	"user_id" INT REFERENCES users(id) ON DELETE CASCADE,
	"appliance_id" INT REFERENCES appliances(appliance_id) ON DELETE CASCADE,
	unique (user_id, appliance_id)
);

CREATE TABLE "tasks" (
  "task_id" serial primary key,
  "task_name" varchar(240) not null,
  "task_description" varchar(240) not null,
  "freq_day" INT,
  "freq_type" varchar(20),
  "appliance_id" INT REFERENCES appliances(appliance_id) ON DELETE CASCADE
);

CREATE TABLE "mytasks" (
	"mytask_id" serial primary key,
	"usersapp_id" INT REFERENCES Users_Appliances(usersapp_id) ON DELETE CASCADE,
	"task_id" INT REFERENCES tasks(task_id) ON DELETE CASCADE,
	"firstcompleteddate" DATE DEFAULT NULL,
	"task_name" varchar(240) not null,
 	"task_description" varchar(240) not null,
  	"freq_day" INT,
  	"freq_type" varchar(20),
	"task_creation_date" TIMESTAMP DEFAULT NOW(),
	"task_due_date" DATE DEFAULT NULL,
	"taskcompleted" BOOLEAN DEFAULT 'false',
	"task_completion_date" TIMESTAMP,
	"task_url" varchar (240)
);
```

## Screen Shots

![Intake Form](https://github.com/Kitty-Ng/Homr/blob/master/server/public/assets/img/Intake_Form.png "Intake Form")
![Late Tasks](https://github.com/Kitty-Ng/Homr/blob/master/server/public/assets/img/Late_Tasks.png "Late Tasks")
![Approaching Tasks](https://github.com/Kitty-Ng/Homr/blob/master/server/public/assets/img/Approaching_Tasks.png "Approaching Tasks")
![Future Tasks](https://github.com/Kitty-Ng/Homr/blob/master/server/public/assets/img/Future_Tasks.png "Future Tasks")
![Completed Tasks](https://github.com/Kitty-Ng/Homr/blob/master/server/public/assets/img/Completed_Tasks.png "Completed Tasks")
![Photo Gallery](https://github.com/Kitty-Ng/Homr/blob/master/server/public/assets/img/Photo_Gallery.png "Photo Gallery")

<!-- ## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused. -->

### Completed Features

High level list of items completed.

- [x] User can create an account or log into an existing account
- [x] User will be prompted to add an appliance to their profile, which is stored under their name in the database
- [x] Once users have selected their appliance, they will be prompted to fill out the last time they completed the required upkeep.
- [x] If users do not know when they last completed the task, they can choose "Help Me HOMR" and the app will autugenerate a recommended due date.
- [x] Once a task date is selected, user will have an option to upload an image for this task.
- [x] From the main menu, the user can also access all Late, Approaching (due within 7 days of today), Future, or Completed tasks. They will also be able to view all uploaded pictures in their account.
- [x] New tasks are added dynamically based on when the user last marks the task as completed. 


### Next Steps

Features that I would like to add at some point in the future.

- [ ] Reporting page to outline user's on-time task completion rate
- [ ] Allow users to store home emergency utility contacts (plumber, electrician, etc)
- [ ] Youtube video embeds/ Youtube search API
- [ ] Allow users to add multiple homes to 1 HOMR account


## Deployment

This application requires an access key for the FileStackAPI, which can be requested from the site. Once requested, save the key API key in a `.env` file outside the server folder and add .env to your .gitignore file.

## Authors

* Kitty Walders


## Acknowledgments

* Millicent Walsh, Dev Jana, Prime Digital Academy
