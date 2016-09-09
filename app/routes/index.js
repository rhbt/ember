import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),
  loggedInUser: Ember.inject.service('user'),
  
  model() {
    return Ember.RSVP.hash({
      user: function(){
        const uid = this.get('session').get('uid');
        if (uid) {
          console.log(uid);
          return this.store.find('user', uid);
        } else {
          return null;
        }
      },
      events: this.store.findAll('event')
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'user', model.user);
    Ember.set(controller, 'events', model.events);
  },

 	actions: {
   	facebookLogin: function(provider) {
   		const that = this
   	  const controller = this.get('controller');
        controller.get('session')
        .open('firebase', { provider: provider})
        .then(function(data) {

        	const uid = data.currentUser.uid;
        	 const userExist = that.store.find('user', uid).then(function(user){
             that.get('loggedInUser').loadCurrentUser();
            }).catch(function(error){
              const displayName = data.currentUser.displayName.split(' ');
              const firstName = displayName[0];
              const lastName = displayName[1];
              
              const user = that.store.createRecord('user', {
                  id: uid,
                  email: data.currentUser.email,
                  firstName: firstName,
                  lastName: lastName
                });
                
                return user.save().then(function() {
                  that.get('loggedInUser').loadCurrentUser();
                })
              });
        });
      },

      signUp() {
        const controller = this.get('controller');

        const auth = this.get('firebaseApp').auth();
        auth.createUserWithEmailAndPassword(controller.get('email'), controller.get('password')).
        then((userResponse) => {
          const user = this.store.createRecord('user', {
            id: userResponse.uid,
            email: userResponse.email
          });
          return user.save();
        });
      }
   	}
  
});