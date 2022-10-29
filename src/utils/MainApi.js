// const BASE_URL = 'https://api.yaana.movies.nomoredomains.icu';
const BASE_URL = 'http://localhost:3000';

const headers = {
    'Content-Type': 'application/json'
  };

const testResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ name, email, password })
    })
      .then(res => testResponse(res));
  }

  export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ password, email })
    })
      .then(res => testResponse(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token, );
          return data;
        }
      });
  }

  export const logOut = () => {
    return fetch(`${BASE_URL}/signout`, {
      credentials: 'include',
      headers: headers,
    })
      .then(res => testResponse(res));
  }
  
//   export const getContent = () => {
//     return fetch(`${BASE_URL}/users/me`, {
//       credentials: 'include',
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     })
//       .then(res => testResponse(res))
//   }

  export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: headers
    })
      .then(res => this._testResponse(res));
  }

  export const editProfile = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        name,
        email
      })
    })
      .then(res => this._testResponse(res));
  }