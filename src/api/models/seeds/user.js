import User from '../user';
import chalk from 'chalk';

const data = [
  {
    username: 'admin',
    password: '123',
    email: 'floyd@admin.com',
    name: 'Pink',
    lastname: 'Floyd',
    roles: ['admin']
  }, {
    username: 'user',
    password: '123',
    email: 'peppers@user.com',
    name: 'Chilli',
    lastname: 'Peppers',
    roles: ['user']
  }
];

// Clean before plant
User.remove(() => {
  // Insert
  User.create(data, (err) => {
    console.log(chalk.cyanBright(`Seed-> Published User's!`));
  });
})
