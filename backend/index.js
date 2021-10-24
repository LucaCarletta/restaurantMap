//imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const sharp = require("sharp");
const axios = require("axios").default

//!!!CHANGE THIS TO LOCATION OF LOCAL REPO!!!
const BASE_DIR = "/Applications/MAMP/htdocs/"

/*
 Map dimension:
 top: 47.53738
 Bottom: 47.57234

 left: 7.62564
 right: 7.54346

 Image:
 width: 2148
 height: 1358

*/

const max_lat = 47.57234
const min_lat = 47.53738

const max_long = 7.62564
const min_long = 7.54346

const width = 2148
const height = 1358

const port = 5000;
const app = express();
//API Config
const yelp = axios.create({
	baseURL: 'https://api.yelp.com/v3/businesses',
	headers: {
		Authorization: 'Bearer m-ZvWqG964ha-o452wBs3FHc3Wyy7uc70CbHcRyO00-pF34NOxqNA0kzgXcR9Kza30y-gZjzR9kcsW6oR_6LyFpLgrVxqEKzG-Q2-WxI72uy9jiFoO19jvBZNTlBXnYx',
	}
})

//convert cordinates into position on map
const getPosition = (cordinates) => {
	var x = Math.floor((cordinates.longitude - min_long) * (width / (max_long - min_long)))
	var y = Math.floor((cordinates.latitude - min_lat) * (height / (max_lat - min_lat)))
	return { x, y }
}

//Dynamische Bildbearbeitung
const loadImage = async (img, pos, res) => {
	//2148 is the Width of the image the pos is from the Right bc the cordinadtes are smaler on the right 
	//+ 50 bc the pin  width is 100 
	var left = 2148 - pos.x + 50
	// -100 bc pin height is 100
	var top = pos.y - 100

	await sharp(img)
		//Puts the pin image over the map at the desired Position
		.composite([{ input: 'imgs/pin.png', top, left }]).png()
		// Creates a png File for the Response
		.toFile('imgs/restaurants.png')

	//sendFile need a absolute Path
	res.sendFile(BASE_DIR + '/restaurantMap/backend/imgs/restaurants.png')
};



//Security
app.use(cors({ origin: '*', methods: ['POST'] }));
app.use(helmet());
app.use(helmet.xssFilter());
app.use(bodyParser.json());


app.get('/', (req, res, next) => {
	//API Request
	yelp.get(`/search?term=food&location=Basel&limit=10&price=${req.query.price}`)
		.then(result => {
			busines = result.data.businesses[0]
			var pos = getPosition(busines.coordinates)
			loadImage('imgs/map.png', pos, res)
		})
		.catch(err => console.log(err))

})

//For request on non existend Routes
app.use((req, res, next) => {
	res.send({ messages: ['Route not found'], status: 404 })

})

//Port config (5000) 
app.listen(port, console.log(`[+] Server is running on port ${port}!`));