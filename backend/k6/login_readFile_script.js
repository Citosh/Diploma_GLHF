import http from 'k6/http';
import { check } from 'k6';


let userCounter = 0;

export let options = {
  vus: 1,
  iterations: 5,
};

export default async function () {



  userCounter++;


  const userData = {
    email: `user_${userCounter}@example.com`,
    password: 'password123',
  };


  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  const response = http.post('http://localhost:5000/auth/login', JSON.stringify(userData), params);


  check(response, {
    'Registration was successful': (res) => res.status === 200,
  });


  const fileName = "test"

  const fileData = {
    fileName: fileName
  }

  const paramsForPut = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(response.body).token}`,
    },
  };

  const responseFromFileCreation = http.post('http://localhost:5000/user/filedata', JSON.stringify(fileData), paramsForPut);
  check(responseFromFileCreation, {
    'File creation was successful': (res) => res.status === 200,
  });
}




