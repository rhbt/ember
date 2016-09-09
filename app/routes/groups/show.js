import Ember from 'ember';

export default Ember.Route.extend({

	loggedInUser: Ember.inject.service('user'),

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
    const that = this;
		this.get('loggedInUser').get('currentUser.administrating')
			.then(function(groups) {
				let setToTrue;
				const groupID = that.controller.get('group').get('id');
					groups.forEach(function(group) {
						if (group.get('id') == groupID) {
							Ember.set(controller, 'isAdmin', true);
							setToTrue = true;
						} 
					})
				if (!setToTrue) {
					Ember.set(controller, 'isAdmin', false);
				}
			});
  },

	actions: {

		createEvent: function(event) {
			const group = this.controller.get('group');
			const that = this;
			group.get('events').addObject(event);
			group.save().then(function() {
				event.set('group', group);
				event.save().then(function() {
					that.transitionTo('index');
				})
			});
		}


	}

});
