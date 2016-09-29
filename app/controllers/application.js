import Ember from 'ember';

export default Ember.Controller.extend({

	loggedInUser: Ember.inject.service('user'),

	 actions: {

	   	signOut: function() {
	   	  const _this = this;
	   	  this.get('loggedInUser').set('currentUser', null);
	      this.get('session').close().then(function() {
	      	_this.transitionToRoute('index');
	      });
	  	}
	  	
	 }

});
