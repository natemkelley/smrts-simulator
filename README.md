# smrts-simulator

##Setup

Install Node.js 8.9.1 or higher
Install MongoDB Community 4.0 or higher

Clone git repository from https://github.com/natemkelley/smrts-simulator.git

npm install

##To start the server

npm start

##Mongo setup for windows 10
Mongodb community for all OS can be found here
https://www.mongodb.com/download-center/community

After proceeding through a generic install, you should modify your windows path variable

In the windows search bar type 'env', choose the option 'Edit system environment variables' >> Environment Variables >> Find path >> edit >> New >> browse to find the mongo bin folder (C:\Program Files\MongoDB\Server\4.0\bin)

mongoimport is now enabled 
mongoimport -d <db name> -c <collection name> --type csv --file <file name> --headerline