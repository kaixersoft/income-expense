### Description

- Income/Expense Management

### Local Deployment

#### Pre-requisite

- Docker
- NodeJs 18 or above

#### Installation

1. Clone the repository to you local

2. Provision a docker based Postgres database, run the command from the root folder
   1. `docker compose up`
3. Go to backend folder and run the following:
   1. `npm install`
   2. `npm start`
4. Once both Postgres docker container and nestjs application are running, you can checkout the postman collection provided for the available API endpoints
