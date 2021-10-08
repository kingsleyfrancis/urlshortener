# urlshortener
A react and node application for shortening url. This repository consists of frontend which is a react application and backend built with node.

# Running the application

Make sure docker is installed and setup properly

## Frontend 
To run the frontend in the commandline, cd into ./frontend, run `npm install && npm start`. 

To build and tag the docker image as a standalone, cd ./frontend then run `docker build -t urlshortener.frontend .` 


## Backend 
To run the frontend in the commandline, cd into ./backend, run `npm install && npm start` .

To run api tests. Run `npm run test`


To build and tag the docker image as a standalone, cd ./backend then run `docker build -t urlshortener.backend .` in a command line pointing to ./backend 


### Docker Compose

To run the backend as docker compose. 

Run `docker-compose -f docker-compose.production.yml up` in a command pointing to the root folder 
