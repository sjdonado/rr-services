import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/api/v1';

class HttpClient {
  constructor(path) {
    this.path = `${SERVER_URL}${path}`;
  }

  get(endpoint = '') {
    return axios.get(`${this.path}${endpoint}`)
      .then(res => res.data)
      .catch(function (error) {
        console.log(error);
      })
  }

  post(body, endpoint = '') {
    return axios.post(`${this.path}${endpoint}`, body)
      .then(res => res.data)
      .catch(function (error) {
        console.log(error);
      })
  }
}

export default HttpClient;