const { createHierarchy } = require('../index');
const parentKey = 'parentId';
const fifa = { id: 1, name: 'FIFA' };
const conmebol = { id: 2, name: 'CONMEBOL', parentId: 1 };
const cbf = { id: 3, name: 'cbf', parentId: 2 }
const paulista = { id: 4, name: 'paulista', parentId: 3 };

/*
let hierarchy = {};

const parentKey = 'parentId';
hierarchy = createHierarchy(hierarchy, { id: 1, name: 'fifa', parentId: undefined }, parentKey);
hierarchy = createHierarchy(hierarchy, { id: 2, name: 'comebol', parentId: 1 }, parentKey);
hierarchy = createHierarchy(hierarchy, { id: 3, name: 'cbf', parentId: 2 }, parentKey);
hierarchy = createHierarchy(hierarchy, { id: 4, name: 'paulista', parentId: 3 }, parentKey);
console.log(JSON.stringify(hierarchy));
*/

test('add records should response one hierarchy', () => {
  let hierarchy = Object.assign({}, fifa);

  let response = createHierarchy({}, fifa, parentKey);
  expect(response).toEqual(hierarchy);

  hierarchy.children = [Object.assign(conmebol)];
  response = createHierarchy(response, conmebol, parentKey);

  hierarchy.children[0].children = [Object.assign(cbf)];
  response = createHierarchy(response, cbf, parentKey);
  expect(response).toEqual(hierarchy);

  hierarchy.children[0].children[0].children = [Object.assign(paulista)];
  response = createHierarchy(response, paulista, parentKey);
  expect(response).toEqual(hierarchy);
});