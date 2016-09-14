import Ember from 'ember';

export default Ember.Mixin.create({
	loggedInUser: Ember.inject.service('user'),

 	actions: {

   	signOut: function() {
   	  const that = this;
   	  this.get('loggedInUser').set('currentUser', null);
      this.get('session').close().then(function() {
      	that.transitionTo('index');
      });
  	}
  	
  }
});
