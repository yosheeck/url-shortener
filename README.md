# url-shortener

This app has been written as a part of educational exercise.

It has been created as PoC of basic frontend+backend. The idea is to follow all  advice as per tutorials and documentation that can be easily found at `February 2025`. 

Details:
- TS: used TypeScript that was "latest" at the time
- LIBS: all dependencies have been installed as "latest"
- AI: github copilot was turned on in my IDE - it was helpful when generating comments and some obvious code, but in most of the code was written manually
- Backend
  - minimal use of libraries: 
    - pure express
    - pure MongoDB driver was used
- Frontend: 
  - React, Vite (more below, in "Frontend section")
  - No UI framework
- Tests
  - bad practice alert: zero tests present

# Ports

BE: 8001
FE: 8002

# Database

Start mongoDB by running:
```
docker compose up
```
in root folder.

## Explanation (if you're new to docker)

Docker will look into `docker-compose.yml` file. Docker will find that "mongo" container needs to be started.

Then it will download all `mongo` docker "layers" from docker hub and run mongoDB inside the container.

The port `27017` will be exposed from the insider of the container, so that the application can hit 27017 to talk to MongoDB. The port number is explicitly given in the configuration in the `docker-compose.yml` file.

# Frontend

This app was created with 
```
npm create vite@latest
```
as a starting point.
I picked `Typescript + SWC` in configuration.

> Note: CRA (Create React App) is deprecated (according to their own website) and React homepage advice is to use any of the existing frameworks.

# Backend

It's pure node.js + Express. It uses nanoid to generate nice-looking shortened URLs.

# How to run it

// TODO