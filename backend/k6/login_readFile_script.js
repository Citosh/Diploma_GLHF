import http from 'k6/http';
import { check } from 'k6';


let userCounter = 0;

export let options = {
  vus: 20,
  iterations: 20,
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


  const fileName = "108"

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
    'File reading was successful': (res) => res.status === 200,
  });
}





