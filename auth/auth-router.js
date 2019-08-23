const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js');
const artists = require('../artists/artist-model.js');



router.post('/reg', (req, res) => {
    const artist = req.body
    const hash = bcrypt.hashSync(artist.password, 14)
    artist.password = hash
    return artists.addUser(artist)
        .then(created => {
            res.status(201).json(created)
        }).catch(error => {
            res.status(500).json({ message: 'failed to add user' })
        })
})


router.post('/login', (req, res) => {
    let { password, username } = req.body
    artists.findBy({ username })
        .first()//takes first item out of object
        //passing it the password guess in plain text and the password hash obtained from the database to validate credentials.
        //If the password guess is valid, the method returns true, otherwise it returns false.The library will hash the password guess first and then compare the hashes
        .then(artist => {
            if (artist && bcrypt.compareSync(password, artist.password)) {
                const token = generateToken(artist)
                res.status(200).json({ message: `Hello ${artist.username}, You've successfully logged in`, token })
            } else {
                res.status(401).json({ message: 'invalid login info, try again.' })
            }
        }).catch(error => {
            res.status(500).json({ message: 'Hey backend, you messed up, login failed' })
        })
})

function generateToken(artist) {
    const payload = {
        subject: artist.id,
        username: artist.username,
    }
    const option = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, secret.jwtSecret, option)
}


module.exports = router;