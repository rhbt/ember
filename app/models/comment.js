import DS from 'ember-data';

export default DS.Model.extend({
	content: DS.attr('string'),
	group: DS.belongsTo('group'),
	user: DS.belongsTo('user')
});
