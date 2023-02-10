'use strict'
var ADVERTS_JSON = require('./Adverts.json'); 

require('dotenv').config() // inicializamos variables de entorno desde el fichero .env

const conn = require('./lib/connect');

const { Advert, User } = require('./models')

async function main () {

  // Inicializar la colección de anuncios
  const advertsResult = await initAdverts(ADVERTS_JSON.adverts);
  console.log(`\nAdverts: Deleted ${advertsResult.deletedCount}, loaded ${advertsResult.loadedCount}`)

  //Inicializar la colección de usuarios
  // const usersResult = await initUsers()
  // console.log(`\nUsers: Deleted ${usersResult.deletedCount}, loaded ${usersResult.loadedCount.length}`)

  await conn.close();
  console.log('\nDone.')
  return process.exit(0)
}

async function initAdverts(data) {
  const { deletedCount } = await Advert.deleteMany()
  // const loadedCount = await Advert.cargaJson(fichero)
  await Advert.insertMany(data);
  const loadedCount = await Advert.count({});
  return { deletedCount, loadedCount }
}

// TODO: this function many or may not need some adjustments
// async function initUsers () {
//   const { deletedCount } = await User.deleteMany()
//   const loadedCount = await User.insertMany([
//     {name: 'user', email: 'user@example.com', password: User.hashPassword('1234')},
//     {name: 'user2', email: 'user2@example.com', password: User.hashPassword('1234')}
//   ])
//   return { deletedCount, loadedCount }
// }


main()
.catch(err => console.error('Error!', err));