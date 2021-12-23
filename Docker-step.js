	docker build .
	docker image ls
	docker image rm 23434sd - for delete
	
	// for image
	docker build -t payout-image .
	docker build -t payout-image . // if u add something and update type same command
	docker image ls
	
	// for conatiner 
	docker ps
	docker run -d -p 3000:3000 --name payout-app payout-image
	docker run -e CHOKIDAR_USEPOLLING=true -v %cd%\src:/app/src -d -p 3000:3000 --name payout-app payout-image
	
	docker run -e CHOKIDAR_USEPOLLING=true -v D:\React30\Sp4_final\src:/app/src -d -p 3000:3000 --name payout-app payout-image
	
	docker run -it d --name payout-app -p 3000:3000 payout-image // used this one only
	
	// for kill conatiner
	docker rm payout-app -f
	
	// for interactive mode
	docker exec -it payout-app bash
	
	@rootw44:/app#
	
	@rootw44:/app# exit // for exit
	
	// Buil docker file for production sp4_final == project folder
	docker build -f Dockerfile.prod -t payout-image:Sp4_final .    
        docker run -dt -p 80:80 payout-image:Sp4_final
	
	// Dockerfile
	# pulling official base image
FROM node:14.18.0

# seting working directory
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

//Dockerfile.prod

# # build environment
# FROM node:16.13.0 as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm ci --silent
# RUN npm install react-scripts@3.4.1 -g --silent
# COPY . ./
# RUN npm run build

# # production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
FROM node:14-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/build /etc/nginx/html/arif/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
	
	// .dockerignore file
	
	node_modules
build
.dockerignore
Dockerfile
Dockerfile.prod



// default.conf

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
