const axios = require('axios');
const config = require('../../config.json');
const HttpError = require('../errors/http');

const _network = axios.create({
  baseURL: `https://${config.emvisage.instance}.emvisage.net/hapi`,
  headers: {
    Authorization: config.emvisage.apiKey
  }
});

class Emvisage {

  static getMaterial(materialId) {
    return _network
      .get(`/material/${materialId}`)
      .then(res => res.data)
      .catch(HttpError.log);
  }

  static findMaterial(criterias) {
    return _network
      .post(`/material/where`, criterias)
      .then(res => res.data)
      .catch(HttpError.log);
  }


  static getResource(resource) {
    return _network
      .get(`/material/${materialId}`)
      .then(res => res.data)
      .catch(HttpError.log);
  }


  static createResource(resource) {
    return _network
      .post(`/resource`, resource)
      .then(res => res.data)
      .catch(HttpError.log);
  }


  static editResource(resourceId, resource) {
    return _network
      .put(`/resource/${resourceId}`, resource)
      .then(res => res.data)
      .catch(HttpError.log);
  }

  static getMaterialResources(materialId) {
    return _network
      .get(`/material/${materialId}/resource`)
      .then(res => res.data)
      .catch(HttpError.log);
  }
}

module.exports = Emvisage;
