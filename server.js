import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { expressjwt } from 'express-jwt'
import jwks from 'jwks-rsa'

import mongoose from 'mongoose'

import qrCodeRoutes from './app/routes/qrcodes.js'
import userRoutes from './app/routes/users.js'
import notificationRoutes from './app/routes/notifications.js'

const app = express()
const CONNECTION_URL = 'mongodb+srv://wdp:THzfTd8nGXeL2CR@merlin.zxfws.mongodb.net/qr?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
var jwtCheck = expressjwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev--tglatiy.us.auth0.com/.well-known/jwks.json'
    }),
  audience: 'https://qr-server-epr.herokuapp.com/api/v1',
  issuer: 'https://dev--tglatiy.us.auth0.com/',
  algorithms: ['RS256']
});

/**
 * Connect to MongoDB
 * @returns {Promise<void>}
 * @private
 */
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('connected to database')

  /**
   * Express configuration
   * @returns {void}
   * @private
   */

  // Enable CORS
  app.use(cors())

  // Parse JSON bodies (as sent by API clients)
  app.use(bodyParser.json({ limit: '30mb', extended: true }))
  app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

  // Use jwtCheck middleware
  app.use(jwtCheck)

  // Routes
  app.use('/api/v1/qr', qrCodeRoutes)
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/notifications', notificationRoutes)

  app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
  })
})
.catch((err) => console.log(err))