# GUIDEXP ADMIN SYSTEM

## Development Tools

1. Front End

- ReactJS + Ant Design for UI components

2. Back End

- Node (Javascript Runtime)

- Express.js (Web framework)

- MongoDB (Database)

## Backend Setup

- Make sure you have nodejs and MongoDB installed on your local envirnoment.

- Run `npm i` in the root directory to install required packages.

- Create a .env file in the root directory and copy everything inside .env-template into .env. Then fill out .env.

- Run `node app.js` to run the backend.

## Frontend Setup

- Run `npm i` in the `./client` directory.

- Run `npm start` to start the frontend.

## Database Design

![](gxp-model.png)

- https://app.lucidchart.com/documents/view/74dc46a3-9369-4b2e-a337-6eb3b2eb0668

## API Endpoints

For specific api documentation, go to https://docs.google.com/document/d/1fQh_PRGdA6DE4-AGwWQQ43tOuJ5fATAqogAmaVR3MWA/edit?usp=sharing

- auth's APIs

| Route                  | HTTP Method   |Permission     |Short Description                                                                                   |
| ---------------------  |:-------------:|:-------------:|:-----------------:                                                                                 |
| /auth/login            | POST          | ALL           | A user logs in and receive a jwt token.                                                            |
| /auth/forget           | POST          | ALL           | A user forgets his/her password and receive a reset password email.                                |
| /auth/reset/:userId    | GET           | ALL           | Check if reset password token has expired.                                                         |
| /auth/reset/:userId    | POST          | ALL           | Reset user's password.                                                                             |
| /auth/activate/:userId | POST          | ALL           | On registering a new MANAGER and STAFF user, an email will be sent to the user to activate account.|  

- user's APIs

| Route                             | HTTP Method   |Permission       | Short Description                                                        |
| ---------------------             |:-------------:|:-------------:  |:-----------------:                                                       |
| /user/customer                    | GET           | GUIDEXP         | GUIDEXP gets all customers' info.                                        |
| /user/manager                     | GET           | GUIDEXP         | GUIDEXP gets all MANAGER users' info.                                    | 
| /user/staff                       | GET           | GUIDEXP,MANAGER | GUIDEXP gets all staffs' info, MANAGER gets all his/her staffs' info.    |
| /user/customer/:customerId        | GET           | GUIDEXP         | GUIDEXP gets a single customer's info.                                   |
| /user/manager/:customerId         | GET           | GUIDEXP         | GUIDEXP gets a single manager's info.                                    | 
| /user/staff/:customerId/:userId   | GET           | GUIDEXP,MANAGER | GUIDEXP gets a single staff's info, MANAGER get one of its staff's info. |
| /user/customer                    | POST          | GUIDEXP         | GUIDEXP creates a new customer and an associated MANAGER user.           |
| /user/staff                       | POST          | MANAGER         | MANAGER creates a new STAFF user.                                        | 
| /user/permission/:userId          | POST          | MANAGER         | MANAGER assigns write permission to STAFF.                               | 
| /user/change/manager/:customerId  | POST          | GUIDEXP         | GUIDEXP changes the MANAGER of a customer.                               |
| /user/staff/delete/:userId        | POST          | MANAGER         | MANAGER deletes one of his/her STAFF users.                              |
| /user/guidexp                     | POST          | -               | Developer create a GUIDEXP user.                                         | 

- exhibit's APIs

| Route                               | HTTP Method   |Permission       | Short Description                                                                |
| ---------------------               |:-------------:|:-------------:  |:-----------------:                                                               |
| /exhibit                            | POST          | MANAGER         | MANAGER creates a single exhibit.                                                | 
| /exhibit                            | GET           | ALL             | GUIDEXP gets all exhibits. MANAGER & STAFF get all his/her exhibits.             | 
| /exhibit/:exhibitId                 | GET           | ALL             | GUIDEXP gets a single exhibits. MANAGER & STAFF get one of his/her exhibits.     | 
| /exhibit/:exhibitId                 | PUT           | MANAGER         | MANAGER updates a single exhibit.                                                | 
| /exhibit/:exhibitId/:language_code  | PUT           | MANAGER, STAFF* | MANAGER updates a single ehxibit of a language. STAFF can if given the perm.     |
| /exhibit/all/exhibition             | GET           | ALL             | GUIDEXP gets all exhibitions. MANAGER & STAFF get all his/her exhibitoins.       | 
| /exhibit/exhibition                 | POST          | MANAGER         | MANAGER creates a single exhibition.                                             | 
| /exhibit/exhibition/:exhibitionId   | GET           | ALL             | GUIDEXP gets a single exhibition. MANAGER & STAFF get one of his/her exhibitions.|  
| /exhibit/exhibition/:exhibitionId   | PUT           | MANAGER         | MANAGER updates a single exhibition.                                             |
| /exhibit/exhibition/:exhibionId/:language_code| PUT | MANAGER, STAFF* | MANAGER updates a single exhibition of a language, STAFF can if given the perm.  |  

