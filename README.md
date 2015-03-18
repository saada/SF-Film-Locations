# Introduction

### SF Film Locations

Create a service that shows on a map where movies have been filmed in San
Francisco. The user should be able to filter the view using autocompletion
search.

The data is available on [DataSF](http://www.datasf.org/): [Film
Locations](https://data.sfgov.org/Arts-Culture-and-Recreation-/Film-Locations-in-San-Francisco/yitu-d5am).

## Known Bug

Bugs on the map page are due to limited access to Google Maps API. So it's not unusual to see a different set of locations for the same film because the Google Maps API randomly rejects some of the requests.

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

# Files written by me

	myapp/views/*
	myapp/assets/*
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
