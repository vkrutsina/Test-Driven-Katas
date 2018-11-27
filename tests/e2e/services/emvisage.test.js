const _ = require('lodash');
const Emvisage = require('../../../src/services/emvisage');

console.log('------------- Emvisage Service -------------');

const materialId = 8472;

console.log('------------- Get Material -------------');
Emvisage.getMaterial(materialId).then(material => {
  console.assert(material, 'There should be a material');
  console.assert(material.id === materialId, 'Material id should match');
  console.log('Get Material Success');
});

console.log('------- Get Material Resources -------');
Emvisage.getMaterialResources(materialId).then(resources => {
  console.assert(resources, 'There should be a response');
  console.assert(resources.length > 0, 'There should be some resources attached to this material');
  console.log('Get Material Resources Success');
});

console.log('------- Find Material -------');
const criterias = { data: { epicID: 10268 } };
Emvisage.findMaterial(criterias).then(materials => {
  console.assert(materials, 'There should be a response');
  console.assert(materials.length === 7, 'There should seven projects that match');
  console.log('Find Resources Success');
});

console.log('------- Create Resource -------');

const newResource = {
  material_id: 8481,
  name: 'Resource Name',
  duration: 10,
  rate: 40,
  cost: 40 * 10,
  week: 48,
  year: 2018,
  target_id: 125, // user_id (Saran)
  target_type: 'user'
};

Emvisage.createResource(newResource).then(resource => {
  console.assert(resource, 'There should be a response');
  console.assert(_.isNumber(resource.id), 'There should a new resource id');
  console.log('Create Resource Success');
});
