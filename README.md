# membership-node

Technical Stack:
1. node.js
2. express.js
3. mongodb (download mongodb compass to view the database)
4. docker (and docker-compose)

Quick Start

Fill-in ````.env```` with your own config

run command:

    docker-comopse up

Post APIs (Pass in the auth response object as parameter):

    /user/sign-in-with-apple
    /user/sign-in-with-google

Example react native app is on https://github.com/flik930/react-native-signin-tests.git