import Ember from 'ember';

export default Ember.Route.extend({

	loggedInUser: Ember.inject.service('user'),

	model(params) {
	    return Ember.RSVP.hash({
	      group: this.store.find('group', params.group_id),
	      event: this.store.createRecord('event')
	    });
  	},

    deactivate: function() {
	    const event = this.controller.get('event');
	    event.rollbackAttributes();
  	},

  setupController(controller, model) {

    this._super(...arguments);
    Ember.set(controller, 'group', model.group);
    Ember.set(controller, 'event', model.event);

	this.get('loggedInUser').get('currentUser.administrating')
		.then(function(groups) {
			let setToTrue;
			const groupID = controller.get('group').get('id');
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

	this.get('loggedInUser').get('currentUser.memberships')
		.then(function(groups) {
			let setToTrue;
			const groupID = controller.get('group').get('id');
				groups.forEach(function(group) {
					if (group.get('id') == groupID) {
						Ember.set(controller, 'notMember', false);
						setToTrue = true;
					} 
				})
			if (!setToTrue) {
				Ember.set(controller, 'notMember', true);
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
		},

		joinGroup: function(group) {
			this.controller.set('notMember', false)
			let user = this.get('loggedInUser').get('currentUser');
			group.get('members').addObject(user);
			user.get('memberships').addObject(group);
			user.save();
			group.save();
		}


	}

});
