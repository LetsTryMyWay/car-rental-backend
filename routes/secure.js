// Server/routes/secure.js
const express = require('express');
const passport = require('../passport');
const router = express.Router();

router.get('/protected-route', passport.authenticate('jwt', { session: false }), (req, res) => {
 const user = req.user;
 // ... (additional logic for handling the protected route)
});

module.exports = router;
