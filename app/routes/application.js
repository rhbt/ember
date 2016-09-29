import Ember from 'ember';

export default Ember.Route.extend({

  loggedInUser: Ember.inject.service('user'),

  beforeModel() {
    return this.get("session").fetch()
    .then(() => {
      return this.get('loggedInUser').loadCurrentUser();
    })
    .catch(() => {
    });
  }

});