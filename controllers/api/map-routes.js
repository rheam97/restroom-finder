const router = require('express').Router();
const { Review, User, Bathroom, Map } = require('../../models');
const withAuth = require('../../utils/auth.js');
const sequelize = require('../../config/connection');


// so each marker will need to have a get request in the popup for one bathroom
// each bathroom will be tied to one marker by the marker id 

// get all markers on map



//select one marker with bathroom and reviews



// add marker to map


module.exports= router