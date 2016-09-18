import Ember from 'ember';
import _array from 'lodash/array';
export default Ember.Controller.extend({

    groupChunks: Ember.computed('groups', function() {
        return _array.chunk(this.get('groups').toArray(), 4);
    })
});