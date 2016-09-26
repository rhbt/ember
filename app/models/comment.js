import DS from 'ember-data';

export default DS.Model.extend({
	content: DS.attr('string'),
	timestamp: DS.attr('number'),
	group: DS.belongsTo('group'),
	user: DS.belongsTo('user'),
	event: DS.belongsTo('event')
});
