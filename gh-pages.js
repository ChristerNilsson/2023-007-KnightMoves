import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://github.com/ChristerNilsson/2023-007-KnightMoves.git', // Update to point to your repository
  user: {
   name: 'Christer Nilsson', // update to use your name
   email: 'janchrister.nilsson@gmail.com' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);