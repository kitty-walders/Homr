CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null,
  "phone_number" varchar(10),
  "user_created_at" TIMESTAMP DEFAULT NOW(),
  "address" varchar(240) not null,
  "city" varchar(80) not null,
  "state" varchar(80) not null,
  "postal_code" varchar(5) not null
);

CREATE TABLE "appliances" (
  "appliance_id" serial primary key,
  "appliance_name" varchar(240) not null
);

CREATE TABLE Users_Appliances (
	"usersapp_id" serial primary key,
	"user_id" INT REFERENCES users(id) ON DELETE CASCADE,
	"appliance_id" INT REFERENCES appliances(appliance_id) ON DELETE CASCADE
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