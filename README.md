# directions-demo

Directions Demo is a small demo application using Node.js, React, NextJS, Material UI, Google Maps API, Redux, Thunk, & Persist

The live demo of the application can be accessed here: https://directions-demo.now.sh

## Installation

To install this application, clone the github to a folder on your computer

```javascript
git clone https://github.com/johndetlefs/directions-demo.git
```

then navigate into the folder, install npm modules, and run the dev environment

```javascript
cd directions-demo
npm install && npm run dev
```

and that's it! You can access the app at http://localhost:3001

## Using the application

Once you're up and running, you can login with the following credentials:

Admin:
un: johnpdetlefs+admin@gmail.com
pw: 9Password!

User:
un: johnpdetlefs+readonly@gmail.com
pw: 9Password!

Upon login you will be redirected to a simple map page that will attempt to use your current location. If you choose not to give access to your current location the application will use the lat-lng for Sydney CBD instead.

To get directions to an address, click the blue "+" button on the bottom right, type out the full address, and click "let's go!". You can do this as many times as you like.

## Using the api

There is only one place to go: `/api/admin_only`

Admin users will receive a status of 200 and non-admin (read-only) will receive a status of 401

## Not yet complete

- Haven't implement unit testing
- Need to figure out how to only add Google Maps Script once. Will look into using Redux to store map object
