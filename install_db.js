'use strict'

require('dotenv').config() // inicializamos variables de entrono desde el fichero .env


const conn = require('./lib/connect');
const { askUser } = require('./lib/utils')
const { Advert, User } = require('./models')

const ADVERTS_JSON = './adverts.json'


main().catch(err => console.error('Error!', err))

async function main () {

  // Inicializar la colección de anuncios
  const anunciosResult = await initAnuncios(ANUNCIOS_JSON);
  console.log(`\nAnuncios: Deleted ${anunciosResult.deletedCount}, loaded ${anunciosResult.loadedCount} from ${ANUNCIOS_JSON}`)

  //Inicializar la colección de usuarios
  // const usuariosResult = await initUsers()
  // console.log(`\nUsuarios: Deleted ${usuariosResult.deletedCount}, loaded ${usuariosResult.loadedCount.length}`)


  await conn.close();
  console.log('\nDone.')
  return process.exit(0)
}

async function initAnuncios (fichero) {
  const { deletedCount } = await Advert.deleteMany()
  const loadedCount = await Advert.cargaJson(fichero)
  return { deletedCount, loadedCount }
}

// async function initUsers () {
//   const { deletedCount } = await User.deleteMany()
//   const loadedCount = await User.insertMany([
//     {name: 'user', email: 'user@example.com', password: Usuario.hashPassword('1234')},
//     {name: 'user2', email: 'user2@example.com', password: Usuario.hashPassword('1234')}
//   ])
//   return { deletedCount, loadedCount }
// }
