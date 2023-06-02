const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InviteSchema = new Schema({
  email: { type: String, required: true },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
});

const Invite = mongoose.models.Invite || mongoose.model('Invite', InviteSchema);
module.exports = Invite;
