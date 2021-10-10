# Alison Vandromme - Ynov M1 Docker Elective

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
