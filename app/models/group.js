import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
	
	admins: DS.hasMany('users', {inverse: 'administrating', async: true}),
	members: DS.hasMany('users', {inverse: 'memberships', async: true}),
	events: DS.hasMany('events', {async: true}),
	comments: DS.hasMany('comments')
	
});
