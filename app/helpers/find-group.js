import Ember from 'ember';

export function findGroup(params) {
  const groups = params[0].toArray();
  let arr = groups.map(function(a) {return a.id});
  const groupID = params[1];
  const index = arr.indexOf(groupID);
  return index == -1;
}

export default Ember.Helper.helper(findGroup);
