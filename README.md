# membership-node

Technical Stack:
1. node.js
2. express.js
3. mongodb (download mongo compass to view the database)
4. docker (and docker-compose)

Quick Start

Fill-in ````.env```` with your own config

run command:

    npm install

    docker-comopse up

default base url of node server:

    http://localhost:3000

Download [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass) and connect to the mongodb with base url and your username & password stated in ````.env````:

    http://yourusername:yourpassword@localhost:27017

Post APIs (Pass in the auth response object as parameter):

    /user/sign-in-with-apple
    /user/sign-in-with-google

Example react native app is on https://github.com/flik930/react-native-signin-tests.git