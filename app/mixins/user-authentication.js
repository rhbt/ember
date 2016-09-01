import Ember from 'ember';

export default Ember.Mixin.create({
 	actions: {
   	signOut: function() {
      this.get('session').close();
    }
  }
});
