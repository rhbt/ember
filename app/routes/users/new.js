import Ember from 'ember';
import FacebookLoginMixin from '../../mixins/facebook-login';

export default Ember.Route.extend(FacebookLoginMixin, {
	firebaseApp: Ember.inject.service(),
	actions: {
		signUp() {
		  const controller = this.get('controller');
		  const email = controller.get('email');
		  const password = controller.get('password');
		  const auth = this.get('firebaseApp').auth();
		  auth.createUserWithEmailAndPassword(email, password)
		  .then((userResponse) => {
		    const user = this.store.createRecord('user', {
		      id: userResponse.uid,
		      email: userResponse.email,
		      firstName: controller.get('firstName'),
		      lastName: controller.get('lastName'),
		    });
		    return user.save()
		    .then(() => {
		     this.transitionTo('index');
		    });
		  }).catch((error) => {
		    console.log("ERROR: " + error);
		  });
		}
	}
	
});
