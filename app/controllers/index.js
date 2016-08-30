import Ember from 'ember';

export default Ember.Controller.extend({  
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service('session'),

	actions: {
	  signIn: function(provider) {
	  	const email = this.get('email');
	  	const password = this.get('password');
      this.get('session')
      .open('firebase', { provider: provider, email: email, password: password})
      .then(function(data) {

      });
    },

	  signOut: function() {
	    this.get('session').close();
	  }

	}	
	
});