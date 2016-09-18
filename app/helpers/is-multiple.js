export function isMultiple(params) {
  if (params[0] == 0) {
  	return true;
  }
  const index = params[0] + 1;
  const multiple = params[1];
  return (index % multiple == 0);
}

export default Ember.Helper.helper(isMultiple);
