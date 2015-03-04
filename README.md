# Setup

Installing this app, you need to have docker installed.
The easiest way to install docker is to use docker-machine.

[Docker Machine Installation Guide)](https://docs.docker.com/machine/)

After setting up your docker machine, run the following
		
		git clone <repo>
		cd <repo_folder>
		docker pull saada/uber
		docker run -d -p 8080:80 -v `pwd`/myapp:/app --name uber saada/uber
		docker exec -it uber composer install

The app is accessible through the browser at your docker machine address.

In my case it's `http://192.168.99.100:8080/`.

If you're using docker-machine, you can run `docker-machine ls` to find out the machine's ip.
Otherwise, if you're using boot2docker, you can run `boot2docker ip` to get the ip.

# Hosting

The app is deployed on digital ocean at the following url: http://104.131.113.19/

# Files written by me
myapp/views/*
myapp/web/css/*
myapp/web/js/*
myapp/web/templates/*
myapp/services/*
myapp/controllers/*
myapp/config/params.php
myapp/composer.json
.gitignore
nginx.conf
Dockerfile
README.md

# Frameworks/Libraries used
## PHP
Yii2
Guzzle
## CSS
Bootstrap
Select2
## JS
jQuery
Underscore.js
Backbone.js
Select2
