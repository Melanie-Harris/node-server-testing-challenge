
exports.seed = function(knex) {
  return knex('users').del()// Deletes ALL existing entries
    .then(function () {
      return knex('users').insert([
        { username:'Melanie', password:'GetLikeMe' },
        { username: 'JLegend', password:'SuperStar' },
        { username: 'VGogh', password:'Portrait'}
        
      ]);
    });
};
