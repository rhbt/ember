import Ember from 'ember';
import CommentMixin from '../../mixins/comment'

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
		const _this = this;

  	function isMemberOrAdmin(p, p2) {
  		const groupID = model.group.get('id');
  		const a =_this.get('loggedInUser').get('currentUser.'+p);
  		const groupIDs = a.toArray().map(function(group) {
  				return group.get('id');
  			});
  		groupIDs.includes(groupID) ? Ember.set(controller, p2, true) 
  		: Ember.set(controller, p2, false);
  	}

  	isMemberOrAdmin('administrating', 'isAdmin');
		isMemberOrAdmin('memberships', 'isMember');
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
    }

	}

});
