import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  
  administrating: DS.hasMany('groups', {inverse: 'admins',async: true}),
  memberships: DS.hasMany('groups', {inverse: 'members',async: true}),
  institution: DS.belongsTo('institution')
});