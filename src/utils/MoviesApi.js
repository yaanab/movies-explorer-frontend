const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const headers = {
  'Content-Type': 'application/json'
};

const testResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const getMovies = () => {
  return fetch(BASE_URL, {
    headers: headers,
  })
    .then(res => testResponse(res));
}