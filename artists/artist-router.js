const router = require('express').Router();
const db = require('./artist-model.js');


const restricted = require('../auth/restricted_middleware.js')


router.get('/artists', restricted, (req, res) => {
    return db.findArtist()
        .then(artist => {
            res.status(200).json({ loggedInUser: req.artist.username, artist})
        })
        .catch(err => {
            res.status(400).json({ message: 'Could not retrieve artist list, make sure you are logged in.' })
        })
})//gives list of talent

router.delete('/artists/:id', restricted, (req, res) => {
   const {id} = req.params
   db.removeArtist(id)
   .then(artist => {
       if(artist !== 0){
            res.status(201).json(artist)
       }else{
           res.status(404).json({message: 'unable to remove artist, check token via restricted users'})
       }
   })
})// deletes talent from database

router.post('/artists', (req, res) => {
    const artist = req.body
    return db.addArtist(artist)
        .then(created => {
            res.status(201).json(created)
        }).catch(error => {
            res.status(500).json({ message: 'failed to add user' })
        })
})// add talent to database



router.get('/users', restricted, (req, res) => {
    return db.findUser()
        .then(user => {
            res.status(200).json({ loggedInUser: req.artist.username, user })
        })
        .catch(err => {
            res.status(400).json({ message: 'Could not retrieve artist list, make sure you are logged in.' })
        })
})//create user for database

router.delete('/users/:id', restricted, (req, res) => {
    const { id } = req.params
   db.removeUser(id)
        .then(user => {
            if (user !== 0) {
                res.status(201).json(user)
            } else {
                res.status(404).json({ message: 'unable to remove artist, check token via restricted users' })
            }
        })
})//delete user from backend

module.exports = router;