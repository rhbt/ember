import Ember from 'ember';

export default Ember.Component.extend({
	loggedInUser: Ember.inject.service('user'),
	notMember: true,

	actions: {

	    joinGroup: function(group) {
	      let user = this.get('loggedInUser').get('currentUser');
	      group.get('members').addObject(user);
	      user.get('memberships').addObject(group);
	      user.save();
	      group.save();
	      this.set('notMember', false);
	    }
	  	
	  }

});
