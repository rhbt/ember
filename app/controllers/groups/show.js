import Ember from 'ember';

export default Ember.Controller.extend({
	loggedInUser: Ember.inject.service('user'),
	groupComment: '',
	eventComment: '',

	showDiscussion: true,

	comments: function(){
		return this.get('group.comments').toArray().reverse();
	}.property('group.comments'),

	actions: {
		showDiscussion: function(bool) {
			this.set('showDiscussion', bool);
		},

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
					if (commentType === 'group') {
						that.set('groupComment', '');
					}
					else if (commentType === 'event') {
						that.set('eventComment', '');
					}
				
				});
			})
		}
	}
});
