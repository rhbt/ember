import Ember from 'ember';
import _array from 'lodash/array';
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
    // let currentUser = this.get('loggedInUser').get('currentUser') 
    // console.log('uid')
    // console.log(this.get('session').get('uid'));
    // console.log('currentUser')
    // console.log(currentUser);
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
		return groups;
		}, function(reason) {
			Ember.set(controller, 'isAdmin', false);
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
		return groups;
		}, function(reason) {
			Ember.set(controller, 'notMember', true);
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
		},

		postComment: function(content, group) {
			const that = this;
			const user = this.get('loggedInUser').get('currentUser');
			let comment = this.store.createRecord('comment', {
				content: content,
				timestamp: new Date().getTime(),
				group: group,
				user: user
			});
			comment.save().then(function() {
				group.get('comments').addObject(comment);
				group.save().then(function() {
					that.controller.set('content', '');
				});
			})
		}


	}

});
