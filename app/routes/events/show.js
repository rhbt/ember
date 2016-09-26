import Ember from 'ember';

export default Ember.Route.extend({

	loggedInUser: Ember.inject.service('user'),
	model: function(params) {
		return this.store.find('event', params.event_id);
	},

	actions: {
		postComment: function(content, commentOwner, commentType) {
			const that = this;
			const user = this.get('loggedInUser').get('currentUser');
			let comment;
			if (commentType == 'group') {
				
				comment = this.store.createRecord('comment', {
				content: content,
				timestamp: new Date().getTime(),
				group: commentOwner,
				user: user
				});
			}
			else if (commentType == 'event') {
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
					if (commentType == 'group') {
						that.controller.set('groupComment', '');
					}
					else if (commentType == 'event') {
						that.controller.set('eventComment', '');
					}
					
				});
			})
		}
	}
});
