import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),
  
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
 	},

  model: function(){
    const uid = this.get('session').get('uid');
    if (uid) {
      return this.store.find('user', uid);
    } else {
      return null;
    }
  },

 	actions: {
   	facebookLogin: function(provider) {
   		var that = this
   	  const controller = this.get('controller');
        controller.get('session')
        .open('firebase', { provider: provider})
        .then(function(data) {

        	const uid = data.currentUser.uid;
        	 var userExist = that.store.find('user', uid).then(function(user){
             
            }).catch(function(error){
              const displayName = data.currentUser.displayName.split(" ");
              const firstName = displayName[0];
              const lastName = displayName[1];
              
              var user = that.store.createRecord('user', {
                  id: uid,
                  email: data.currentUser.email,
                  firstName: firstName,
                  lastName: lastName
                });
              
                return user.save()
                });
        });
      },

      signUp() {
        const auth = this.get('firebaseApp').auth();
        auth.createUserWithEmailAndPassword(this.get('email'), this.get('password')).
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