var mongoDB = require('../utils/mongoUtil');
var express = require('express');
var router = express.Router();

const clientId = process.env.APPLE_APP_ID;

const appleSignin = require('apple-signin-auth');

const jwt = require("jsonwebtoken");

const genJWT = (payload) => {
  return jwt.sign(payload, process.env.SERVER_SECRET);
}

var userCollection = mongoDB.getDB().collection(process.env.MONGO_COLLECTION);

/* GET users listing. */
router.post('/sign-in-with-google', async function(req, res, next) {
  const { body } = req;
  console.log('body', body)

  const {
    email,
    fullName,
    idToken
  } = body;
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

    let userResult = await userCollection.findOne({userAppleId})

    if (!userResult) {
      //create account
      await userCollection.insertOne({
        id,
        email,
        name: fullName.nickname,
      });
    }

    const accessToken = genJWT({id: userAppleId, name: fullName.nickname});

    res.json({accessToken})
  } catch (e) {
    next(e);
  }
});

module.exports = router;
