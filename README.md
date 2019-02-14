# smrts-simulator

##Setup
Clone git repository from https://github.com/natemkelley/smrts-simulator.git

Linux
Run the init.sh file to install Node.js, MongoDB, and all other dependancies to star the server

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





