import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),
  loggedInUser: Ember.inject.service('user'),
  session: Ember.inject.service('session'),
  
  model() {
    this.get('loggedInUser').loadCurrentUser();
    const uid = this.get('session').get('uid');
    const user = uid ? this.store.find('user', uid) : null;

    return Ember.RSVP.hash({
      user: user,
      events: this.store.findAll('event'),
      group: this.store.createRecord('group')
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    Ember.set(controller, 'user', model.user);
    Ember.set(controller, 'events', model.events);
    Ember.set(controller, 'group', model.group);
  },

  deactivate: function() {
    var group = this.controller.get('group');


    this.controller.get('group').rollbackAttributes();
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
        const that = this;
        const controller = that.get('controller');
        const auth = this.get('firebaseApp').auth();
        auth.createUserWithEmailAndPassword(controller.get('email'), controller.get('password')).
        then((userResponse) => {
          const user = that.store.createRecord('user', {
            id: userResponse.uid,
            firstName: controller.get('firstName'),
            lastName: controller.get('lastName'),
            email: userResponse.email
          });

          return user.save().then(function() {
            that.get('session').open('firebase', 
              { provider: 'password', email: controller.get('email'), password: controller.get('password')}).then(function() {
                that.get('loggedInUser').loadCurrentUser();
              });
          
              
              
              
          });
        });
      } 
   	},

    createGroup: function(newGroup) {

      const that = this;
      const uid = this.get('session').get('uid');
      const user = this.store.find('user', uid).then(function(user) {
        newGroup.get('admins').addObject(user);
        newGroup.get('members').addObject(user);
        user.get('administrating').addObject(newGroup);
        user.get('memberships').addObject(newGroup);
        user.save();
      })
        .then(function() {
          newGroup.save()
            .then(function(newGroup){
              that.transitionTo('index')});
        });
    },

    willTransition() {
      var group = this.controller.get('group');
      this.controller.get('group').rollbackAttributes();
 
    }
  
});