
exports.seed = function (knex) {
  return knex('artists').del()// Deletes ALL existing entries
    .then(function () {
      return knex('artists').insert([
        { talent: 'Poet' },
        { talent: 'Musician'},
        { talent: 'Painter'},
      ]);
    });
};
