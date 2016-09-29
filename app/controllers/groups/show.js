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

	}
	
});
