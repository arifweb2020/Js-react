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
