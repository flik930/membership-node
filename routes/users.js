var mongoDB = require('../utils/mongoUtil');
var express = require('express');
var router = express.Router();

const clientId = process.env.APPLE_APP_ID;

const appleSignin = require('apple-signin-auth');
const {OAuth2Client} = require('google-auth-library');
const jwt = require("jsonwebtoken");

const genJWT = (payload) => {
  return jwt.sign(payload, process.env.SERVER_SECRET);
}

let userCollection
mongoDB.getDB().then((db) => {
  userCollection = db.collection(process.env.MONGO_COLLECTION);
});

/* GET users listing. */
router.post('/sign-in-with-google', async function(req, res, next) {

  const { body } = req;
  console.log('body', body)

  const {
    user,
    idToken,
  } = body;

  const {
    name,
    email,
    id
  } = user;

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    if (userid !== id) {
      console.log('error id', userid, id)
      return;
    }

    let userResult = await userCollection.findOne({id: userid})
    if (!userResult) {
     //create account
      await userCollection.insertOne({
        id,
        email,
        name,
      });
    }

    const accessToken = genJWT({id});

    res.json({accessToken})

  } catch (err) {
    console.log(err)
  }
});

//sign in with apple
router.post('/sign-in-with-apple', async function (req, res, next) {
    const { body } = req;
    console.log('body', body)

    const {
      email,
      fullName,
      identityToken
    } = body;

  try {
    const { sub: id } = await   
      appleSignin.verifyIdToken(identityToken, {
        audience: clientId,
        ignoreExpiration: true, // ignore token expiry (never expires)
      });

    console.log('userAppleId', userAppleId);

    let userResult = await userCollection.findOne({id: userAppleId})

    if (!userResult) {
      //create account
      await userCollection.insertOne({
        id: userAppleId,
        email,
        name: fullName.nickname,
      });
    }

    const accessToken = genJWT({id: userAppleId});

    res.json({accessToken})
  } catch (e) {
    next(e);
  }
});

module.exports = router;
