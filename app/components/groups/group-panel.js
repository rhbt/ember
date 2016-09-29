import Ember from 'ember';

export default Ember.Component.extend({
	loggedInUser: Ember.inject.service('user'),
	notMember: true,

	actions: {

  	joinGroup: function(group) {
      const _this = this;
      let user = this.get('loggedInUser').get('currentUser');
      group.get('members').addObject(user);
      user.get('memberships').addObject(group);
      user.save().then(function() {
        group.save().then(function() {
          _this.set('notMember', false);
        });
      }); 
  	}
	  	
	}

});
