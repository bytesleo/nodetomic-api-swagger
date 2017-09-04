export async function index() {

  // Mongoose
  await require('../lib/mongo').connect();

  // Redis
  await require('../lib/redis').connect();

  // Socket
  await require('../lib/socket').connect();

  // Services
  await require('../auth/services');

  // You can add more require's here! 
}