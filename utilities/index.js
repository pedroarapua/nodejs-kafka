'use strict';

function createHierarchy(hierarchy, message, parentKey) {

  let parent = getParent([hierarchy], 'id', message[parentKey]);
  
  if(!parent) {
    hierarchy = message;
  }
  else {
    parent.children = (parent.children || []).concat(message);
  }
  return hierarchy;
}

function getParent(array, key, value) {
  let parent;
  array.forEach((obj) => {
    if(value) {
      if(obj[key] === value) {
        parent = obj;
      }
      else if(obj.children) {
        parent = getParent(obj.children, key, value);
      }
      return true
    }
  });
  
  return parent;
}

module.exports = { createHierarchy };

/*
let hierarchy = {};

const parentKey = 'parentId';
hierarchy = createHierarchy(hierarchy, { id: 1, name: 'fifa', parentId: undefined }, parentKey);
hierarchy = createHierarchy(hierarchy, { id: 2, name: 'comebol', parentId: 1 }, parentKey);
hierarchy = createHierarchy(hierarchy, { id: 3, name: 'cbf', parentId: 2 }, parentKey);
hierarchy = createHierarchy(hierarchy, { id: 4, name: 'paulista', parentId: 3 }, parentKey);
console.log(JSON.stringify(hierarchy));
*/
