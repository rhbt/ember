import Ember from 'ember';

export default Ember.Mixin.create({
	loggedInUser: Ember.inject.service('user'),

 	actions: {
	   	signOut: function() {
	   	  this.get('loggedInUser').set('currentUser', null);
	      this.get('session').close();
    }
  }
});
