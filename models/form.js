// model/form.js
const AV = require('../utils/av-weapp-min.js');
class Form extends AV.Object {
}
// Register object
AV.Object.register(Form, 'Form');

// Export object
module.exports = Form;