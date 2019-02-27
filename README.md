# smrts-simulator

##Setup
Clone git repository from https://github.com/natemkelley/smrts-simulator.git

Linux
Run the init.sh file to install Node.js, MongoDB, and all other dependancies to start the server

Windows or Mac
Install Node.js 8.9.1 or higher
Install MongoDB Community 4.0 or higher

npm install

##To start the server
npm start

##Site Setup
As defined in the package.json file, the node application will start inside app.js. 

The "routes folder" contains all information related to the socket API. The primary file for the socket is /routes/socket.js For more information related to socket.js please read the below section titled Socket.js. 

The "models folder" contains Schema related to the different simulations. For example, twitterModel.js shows which fields mongoose requires in order to save a new twitter simulation

The "function folder" contains all files that deal with server side functionality. The database.js file should be used for all interfacing with the database.

The "public folder" contains all public facing files. As of February 6, 2019, the app.js file will serve any html file that is located in that folder before going to a route. The render engine is set as .html but this can be changed in app.js.

Node_modules is a folder not found in the GitHub repo but will be generated after npm install. This folder contains all the dependancies related to the node server and should not be touched.


##Site Usage
If you are an admin/simulation leader:

The first thing you will see is the full list of simulations that have been uploaded. Information about each simulation will also be listed. This will be sortable eventually. Clicking on one of them will create a room and take you to the beginning of that simulation.

To upload a simulation, you will click the + button at the bottom right of the screen. You will be asked to provide a .csv file of the tweets you wish to put in the simulation. Be sure the file is properly formatted with tweet field headers in the first row. Authentication will be a future feature.

Once you have entered a simulation, it will not begin until you press the play button. Tweets will appear from the top of the screen in chronological order. How soon the next tweet appears will depend on the actual time each tweet was sent as well as the length of the simulation (more details below). The tweets will push each other downward as they appear. You will be able to navigate the simulation using the time scrubber bar at the bottom. The scrubber will navigate to a specific tweet. Once you have selected a tweet, the simulation will clear all tweets and then re-send all tweets up to the selected tweet.

Various settings can be found in the hamburger menu/sidebar, including the length of a simulation. The site will adjust how quickly tweets appear based on the length given here. Longer simulations will send tweets slower and allow for more tweets to be shown, while shorter simulations will cut the number of tweets shown and send them faster.

If you are a user:

You will see a list of active simulation rooms. This list consists of all public rooms. Private rooms will be invite-only and will not show here. Click a room to join it.

The simulation page will show the tweets that have been sent thus far. You will not be able to interact with anything here. Your job is respond to the tweets as they appear.
