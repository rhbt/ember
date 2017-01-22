import Ember from 'ember';
import CommentMixin from '../../mixins/comments';

export default Ember.Route.extend(CommentMixin, {

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

  	function isMemberOrAdmin(query, valueToSet) {
  		const groups = this.get('loggedInUser').get('currentUser.'+query);
  		const groupIDs = groups.toArray().map(function(group) {
  				return group.get('id');
  			});
  		groupIDs.includes(model.group.get('id')) ? Ember.set(controller, valueToSet, true) 
  		: Ember.set(controller, valueToSet, false);
  	}

  	isMemberOrAdmin.call(this, 'administrating', 'isAdmin');
		isMemberOrAdmin.call(this, 'memberships', 'isMember');
   },

	actions: {

		createEvent: function(event) {
			const group = this.controller.get('group');
			const _this = this;
			group.get('events').addObject(event);
			group.save().then(function() {
				event.set('group', group);
				event.save().then(function() {
					_this.transitionTo('index');
				});
			});
		},

		joinGroup: function(group) {
			this.controller.set('isMember', true);
			let user = this.get('loggedInUser').get('currentUser');
			group.get('members').addObject(user);
			user.get('memberships').addObject(group);
			user.save();
			group.save();
		},

		willTransition() {
	      this.controller.get('event').rollbackAttributes();
	    },


	}

});
