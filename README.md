# directions-demo

Directions Demo is a small demo application using Node.js, React, NextJS, Material UI, Google Maps API, Redux, Thunk, & Persist

The live demo of the application can be accessed here: {insert live url}

## Installation

To install this application, clone the github to a folder on your computer, and run:

```javascript
npm install && npm run dev
```

and that's it!

## Using the application

Once you're up and running, you can login with the following credentials:

Admin:
un: johnpdetlefs+admin@gmail.com
pw: 9Password!

User:
un: johnpdetlefs+readonly@gmail.com
pw: 9Password!

Upon login you will be redirected to a simple map page that will attempt to use your current location. If you choose not to give access to your current location the application will use Sydney lat-lng instead.

To get direction, click the "+" button on the bottom right, type out the full address, and click "let's go!"

## Using the api

There is only one place to go: `/api/admin_only`

Admin users will receive a status of 200 and non-admin (read-only) will receive a status of 401
