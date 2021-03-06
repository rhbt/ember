import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	location: DS.attr('string'),
	description: DS.attr('string'),
	group: DS.belongsTo('group'),
	comments: DS.hasMany('comments')
});
