import Ember from 'ember';

export default Ember.Route.extend({

	model(params) {
    return Ember.RSVP.hash({
      group: this.store.find('group', params.group_id),
      event: this.store.createRecord('event')
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'group', model.group);
    Ember.set(controller, 'event', model.event);
  },

	actions: {
		createEvent: function(event) {
			var group = this.controller.get('group');
			var that = this;
			group.get('events').addObject(event);
			group.save();
			event.set('group', group);
			event.save().then(function() {
				that.transitionTo('index');
			})

		}
	}

});
