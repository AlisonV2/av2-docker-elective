# Alison Vandromme - Ynov M1 Docker Elective

## Stack 

<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" /> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb&logoColor=4EA94B" /> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /> <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />

## Method used
### Step 1: Build API

- Node/Express
- Morgan as a logger middleware
- Nodemon for hot reload
- Mongoose for MongoDB interactions
- GET/POST/DELETE routes

Notes: 
- Connection to local MongoDB
- Test with npm start

### Step 2: API Dockerfile

- Created Dockerfile and .dockerignore
- Test with: 

```sh
docker build -f Dockerfile -t server .
docker run -it -p 3002:80 server
```

- Created docker-compose.yml with MongoDB & Server images
- Change mongoDB url: HOST = name of the mongo service

### Step 3: Build Client

- React client built with CRA
- Added bootstrap and react-bootstrap for easy styling
- Test with npm start (App on port 3000)

### Step 4: Client Dockerfile

- Created Dockerfile and .dockerignore
- Individual test with

```sh
docker build -f Dockerfile -t client .
docker run -it -p 3001:3000 server
```

- Added client to docker-compose.yml
- Added API calls using 'http://localhost/goals' as baseUrl

### Step 5: Build Reverse proxy

- Based on nginx image
- Nginx configuration to redirect to /api
- Dockerfile for nginx
- Changed API calls in client with '/api/goals' as baseUrl
### Step 5: Finish up docker-compose.yml

- Added nginx to docker-compose

### Step 6: Move environment variables to .env

- Replaced hardcoded env variables in docker-compose and server/app.js with unique .env file

### Step 7: Test on MacOS

- Cloned the repository
- Copied .env.sample content to .env.
- Ran docker-compose up --build 

Test successful :) 
## Run the app

- Copy .env.sample content into .env

Then run : 

```sh
docker-compose up --build
```

App will be running on localhost:3007

## Problems I've ran into

- Dotenv files wouldn't load 
- Mongo wouldn't connect unless the app folder is somewhere in C:/User
- Problems using env variables in Nginx conf file

## How I've fixed them

### Dotenv loading failure

Problem fixed after system and volume prune

### MongoDB connection

Problem fixed after moving the app folder into C:/User/

### Nginx ENV variables

- Multistep build to use ENV variables defined in docker compose?
