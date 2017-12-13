import base64 from 'base-64';

const JSON_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + base64.encode('kasutaja1:kasutaja1')
};

class Api {

  static post(query) {
    return fetch('http://paulare.estpak.ee:7474/db/data/cypher', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({
        query: query
      }),
    })
      .then(this.extractJson)
      .then(this.unwrapErrors);
  }

  static extractJson(response) {
    return response.json();
  }

  static unwrapErrors(data) {
    if (data.errors) {
      return Promise.reject(data.errors);
    }
    return data;
  }
}

export default Api;