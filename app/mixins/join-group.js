import Ember from 'ember';

export default Ember.Mixin.create({
	loggedInUser: Ember.inject.service('user'),

 	actions: {

    joinGroup: function(group) {
      this.controller.set('notMember', false)
      let user = this.get('loggedInUser').get('currentUser');
      group.get('members').addObject(user);
      user.get('memberships').addObject(group);
      user.save();
      group.save();
    }
  	
  }
});
