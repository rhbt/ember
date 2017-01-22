import Ember from 'ember';

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

 	actions: {

   	facebookLogin: function(provider) {
   		const _this = this;
   	  const controller = this.get('controller');
      controller.get('session')
        .open('firebase', { provider: provider})
        .then(function(data) {

        	const uid = data.currentUser.uid;
        	_this.store.find('user', uid).then(function(){
            _this.get('loggedInUser').loadCurrentUser();
             
          }).catch(function() {
            const displayName = data.currentUser.displayName.split(' ');
            const firstName = displayName[0];
            const lastName = displayName[1];
              
            const user = _this.store.createRecord('user', {
              id: uid,
              email: data.currentUser.email,
              firstName: firstName,
              lastName: lastName
            });
                
            return user.save().then(function() {
              _this.get('loggedInUser').loadCurrentUser();
            });
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
            {provider: 'password', email: controller.get('email'), password: controller.get('password')}).then(function() {
              that.get('loggedInUser').loadCurrentUser();
            });
                  
        });
      });
    },

    willTransition() {
      this.controller.get('group').rollbackAttributes();
    }

  }

});