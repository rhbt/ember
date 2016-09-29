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

	this.get('loggedInUser').get('currentUser.administrating')
		.then(function(groups) {
			let setToTrue;
			const groupID = controller.get('group').get('id');
				groups.forEach(function(group) {
					if (group.get('id') === groupID) {
						Ember.set(controller, 'isAdmin', true);
						setToTrue = true;
					} 
				});
			if (!setToTrue) {
				Ember.set(controller, 'isAdmin', false);
			}
		return groups;
		}, function() {
			Ember.set(controller, 'isAdmin', false);
		});

	this.get('loggedInUser').get('currentUser.memberships')
		.then(function(groups) {
			let setToTrue;
			const groupID = controller.get('group').get('id');
				groups.forEach(function(group) {
					if (group.get('id') === groupID) {
						Ember.set(controller, 'notMember', false);
						setToTrue = true;
					} 
				});
			if (!setToTrue) {
				Ember.set(controller, 'notMember', true);
			}
		return groups;
		}, function() {
			Ember.set(controller, 'notMember', true);
		});
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
			this.controller.set('notMember', false);
			let user = this.get('loggedInUser').get('currentUser');
			group.get('members').addObject(user);
			user.get('memberships').addObject(group);
			user.save();
			group.save();
		},

		willTransition() {
      this.controller.get('event').rollbackAttributes();
    },

		postComment: function(content, commentOwner, commentType) {
			const _this = this;
			const user = this.get('loggedInUser').get('currentUser');
			let comment;
			if (commentType === 'group') {
				comment = this.store.createRecord('comment', {
				content: content,
				timestamp: new Date().getTime(),
				group: commentOwner,
				user: user
				});
			}
			else if (commentType === 'event') {
				comment = this.store.createRecord('comment', {
				content: content,
				timestamp: new Date().getTime(),
				event: commentOwner,
				user: user
				});
			}
			
			comment.save().then(function() {
				commentOwner.get('comments').addObject(comment);
				commentOwner.save().then(function() {
					if (commentType === 'group') {
						_this.controller.set('groupComment', '');
					}
					else if (commentType === 'event') {
						_this.controller.set('eventComment', '');
					}
					
				});
			});
		}

	}

});
