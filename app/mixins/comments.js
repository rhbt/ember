import Ember from 'ember';

export default Ember.Mixin.create({

	actions: {
		postComment: function(content, commentOwner, commentType) {
			const _this = this;
			const user = this.get('loggedInUser').get('currentUser');
			let comment = this.store.createRecord('comment', {
				content: content,
				timestamp: new Date().getTime(),
				group: commentOwner,
				user: user
			});
			
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
