import Ember from 'ember';

export default Ember.Route.extend({

  user: Ember.inject.service(),

  beforeModel() {
    return this.get("session").fetch()
    .then(() => {
      return this.get('user').loadCurrentUser();
    })
    .catch(() => {
    });
  }

});