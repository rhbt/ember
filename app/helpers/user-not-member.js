import Ember from 'ember';

export function userNotMember(params) {
  const memberships = params[0].toArray();
  const membershipIDs = memberships.map(function(group) {return group.id;});
  const groupID = params[1];
  const index = membershipIDs.indexOf(groupID);
  return index === -1;
}

export default Ember.Helper.helper(userNotMember);
