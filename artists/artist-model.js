const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development)

module.exports = {
    findUser,
    findArtist,
    findBy,
    addUser,
    addArtist,
   removeUser,
   removeArtist,
}

function findUser() {
    return db('users')

} //get full list of created artist (restricted)
function findArtist() {
    return db('artists')

}//get artists

function findBy(body) {
    return db('users').where(body)
} //login

function addUser(users) {
    return db('users')
        .insert(users)
        .then(ids => ({
            id: ids[0]
}) )
} //create add user

function addArtist(artists) {
    return db('artists')
        .insert(artists)
        .then(ids => ({
            id: ids[0]
}) )
} //create add user

function removeUser(id) {
    return db('users')
        .where('id', Number(id))
        .del()
}// delete by id

function removeArtist(id){
return db('artists')
.where('id', Number(id))
.del()
}// delete by id