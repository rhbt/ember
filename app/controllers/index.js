import Ember from 'ember';

export default Ember.Controller.extend({  
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service('session'),
  loggedInUser: Ember.inject.service('user'),

  isLoggingIn: true,

	actions: {
		
	  signIn: function(provider) {
	  	const email = this.get('loginEmail');
	  	const password = this.get('loginPassword');
	  	const that = this;
      this.get('session')
      .open('firebase', { provider: provider, email: email, password: password})
      .then(function(data) {
      	that.get('loggedInUser').loadCurrentUser();
      });
    },

	  setLoginStatus: function(status) {
	  	this.set('isLoggingIn', status);
	  }

	}	
	
});