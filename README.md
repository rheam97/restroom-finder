# restroom-finder

// Public restroom finder

```
User story:
As a user, I want to be able to locate restrooms and add them to a map
database based on my impression and the facilities offered.

```


eslint and prettier:
https://sourcelevel.io/blog/how-to-setup-eslint-and-prettier-on-node

Deployed: https://restroom-finder.herokuapp.com/

Project Reqs

```
The group project must meet the following requirements:
* 		Use Node.js and Express.js to create a RESTful API.
* 		Use a template engine such as Handlebars.js.
* 		Use MySQL and the Sequelize ORM for the database. *** handlebars extensions
* 		Have both GET and POST routes for retrieving and adding new data.
* 		Deploy using Heroku (with data). **we should deploy Monday
* 		Use at least one new library, package, or technology that we haven’t discussed. ** we should install node package for aslant and prettier on the project
* 		Have a polished UI.
* 		Be responsive.
* 		Be interactive (i.e., accept and respond to user input).
* 		Must have a folder structure that meets the MVC paradigm.
* 		Must include authentication (cookies and express-session).
* 		Must protect API keys and sensitive information with environment variables. ** all of us will have different sql data in our env 
* 		Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).
* 		Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).
```

Finally, you must add your project to the portfolio that you created in Module 2.

> **Note**: More details about the project are provided in the online lessons for Module 15.

```
Given I sam searching for good restrooms near me
When I open the app, I am able to see the map markers with basic review information on the map
When I hover over the marker, the information with rating and icons appears in the popup
When I search for restrooms
I am given options within a certain radius 
When I log into the app
User authentication will occur and redirect to login if the inputs are not correct
When I log in with the correct user inputs
I am able to add markers with reviews and information about the bathroom
When I add a review, I can add text, give a star rating, and check boxes of popular facilities in bathrooms
As a user, I can leave multiple reviews and markers
I can see that each bathroom can have multiple reviews
```


Model
* User

* Reviews (star rating as well as comments?)
- Male, female, unisex
- Changing tables
- Menstruation products
- disabled access
- key

* Map Markers (location info, lat, Lon)

User has many reviews
Reviews belongs to User

User belongs to Many markers
Through reviews
Markers belongs to many  users
Through reviews 

Reviews belongs to Markers
Reviews belongs to User

Controller

View

- Conditionally render icons on review property 
- scroll on modal for comments, average rating at top

Confusions: But honestly we can work on this last

- Searching within a specified radius
- Map should know what current location is (button to bring user camera back to current location)
- https://docs.mapbox.com/mapbox-gl-js/example/locate-user/
- https://docs.mapbox.com/help/tutorials/local-search-geocoding-api/
- Animate markers: https://docs.mapbox.com/mapbox-gl-js/example/animate-marker/
- Animate modals: animate.css https://animate.style/#usage

Nice to have:
- Routing
- Favoriting 
- Send coordinates to apple or google maps (get directions button)
- Clustering
- More amenities