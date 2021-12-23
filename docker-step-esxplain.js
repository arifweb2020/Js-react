Dockerization of React Apps.

Docker is a containerization tool used to speed up the development and deployment processes. If you’re working with microservices, Docker makes it much easier to link together small, independent services. It also helps to eliminate environment-specific bugs since you can replicate your production environment locally.

This tutorial demonstrates how to Dockerize a React app using the Create React App generator. We’ll specifically focus on-

Dependencies:-

Docker v19.03.8.
Create React App v3.4.1
Node v13.12.0

Install Docker Desktop 
	Please follow the instructions given on docker site to install and configure the Docker Desktop for windows - https://docs.docker.com/desktop/windows/install/

DockerFile 
The Tutorial assumes one has set-up the react project using the Create React App. Next Step will be to dockerize our application by adding a simple file named Dockerfile.

To Add a Docker file to your application, create a new file in the root project folder and copy paste the below code/commands. 


Example - ReactJS-Front end

# pulling official base image
FROM node:14.18.0
 
# setting working directory
WORKDIR /app
 
# adding `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
 
# installing app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent
 
# adding all files to app
COPY . ./
 
# starting the app
CMD ["npm", "start"]

DockerFile Prod version
	FROM node:14-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/build /etc/nginx/html/payout-admin/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

JAVA backend

FROM openjdk:8-jdk-alpine
MAINTAINER baeldung.com
COPY target/docker-message-server-1.0.0.jar message-server-1.0.0.jar
ENTRYPOINT ["java","-jar","/message-server-1.0.0.jar"]

For detailed information - https://www.baeldung.com/dockerizing-spring-boot-application

Ignoring Files

Add a .dockerignore file in your root directory. This file contains file/folder names which are not required for image building. This also speeds up the building process.

Example-

node_modules
build
.dockerignore
Dockerfile
Dockerfile.prod
Adding nginx configuration for Production build
Create a default.config file in your project directory and setup ports and routes as per your application. Sample file for an react application is given below.

server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;
    location / {
        root   /etc/nginx/html/;
        try_files $uri /payout-admin/index.html$is_args$args =404;
        index  index.html /payout-admin/index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}


Docker Build and Tagging an Image
Move to your root directory and run the following command to build and image

docker build -f Dockerfile.prod -t payout:fe-sprint04 .
docker - start of any docker command
build - command to build the image
-f      -  file option
Dockerfile.prod   - file will be used to build the image optimized for production 
-t     -   tag option
payout:fe-sprint04 - image name with tag
.           -    current directory (Project root path)

Running image on Docker Container
Execute the following command to run the application in the docker container. This command starts the application in the docker container.

docker run -dt -p 80:80 payout:fe-sprint04

Pushing Image to AWS EC2 Instance

Install AWS CLI from below link and setup
https://docs.aws.amazon.com/cli/v1/userguide/install-windows.html
	
