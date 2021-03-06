import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service('session'),
  loggedInUser: Ember.inject.service('user'),

  isLoggingIn: true,

	actions: {
		
	  signIn: function(provider) {
      const _this = this;
	  	const email = this.get('loginEmail');
	  	const password = this.get('loginPassword');
      this.get('session')
      .open('firebase', {provider: provider, email: email, password: password})
      .then(function() {
        _this.get('loggedInUser').loadCurrentUser();
      });
    },

	  setLoginStatus: function(status) {
	  	this.set('isLoggingIn', status);
	  },

    createGroup: function(newGroup) {
      const _this = this;
      const uid = this.get('session').get('uid');
      this.store.find('user', uid).then(function(user) {
        newGroup.get('admins').addObject(user);
        newGroup.get('members').addObject(user);
        user.get('administrating').addObject(newGroup);
        user.get('memberships').addObject(newGroup);
        user.save();
      }).then(function() {
        newGroup.save().then(function() {
          _this.transitionToRoute('groups.index');
        });
      });
    }    

	}
	
});