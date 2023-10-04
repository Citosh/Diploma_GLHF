import http from 'k6/http';
import { check } from 'k6';


let userCounter = 1;

export let options = {
  vus: 1,
  iterations: 5,
};

export default async function () {


  const username = `user_${userCounter}`;


  userCounter++;


  const userData = {
    username: username,
    email: `${username}@example.com`,
    password: 'password123',
  };


  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };



  const response = http.post('http://localhost:5000/auth/reg', JSON.stringify(userData), params);



  check(response, {
    'Registration was successful': (res) => res.status === 200,
  });
}




