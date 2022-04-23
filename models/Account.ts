import { Schema, model, connection } from 'mongoose';

// @ts-ignore
delete connection.models['accounts'];

const accountSchema  = new Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true, unique: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true, unique: true, minlength: 3, maxlength: 50 },
  password: { type: String, required: true, minlength: 8, maxlength: 100 },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
  type: { type: String, required: true, enum: ['member', 'admin', 'owner'] },
  online: { type: Boolean, default: false },
  token: { type: String, default: 'fresh account' },
  key: { type: String, required: true, unique: true },
  socket: { type: String, default: 'fresh account' },
  personal: {
    firstName: { type: String, minlength: 2, maxlength: 25, default: '' },
    lastName: { type: String, minlength: 2, maxlength: 25, default: '' },
    bio: { type: String, maxlength: 160, default: 'No bio yet.' },
    avatar: { type: String, default: '/images/default-pfp.png' },
    badges: { type: Array, default: [] },
  },
  tokens:{ type: Array, default: [] },
  logins: { type: Array, default: [] },
  knownIPs: { type: Array, default: [] },
}, { timestamps: true, versionKey: false });

export default model('accounts', accountSchema);