import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);   // SaltOrRounds 
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;  // 같으면 true, 틀리면 false
};

UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
      {
        _id: this.id,
        username: this.username,
      },
      '!@#$%^&*()',
      {
        expiresIn: '7d',
      },
    );
    return token;
};

UserSchema.statics.findByUsername = function(username) {
    return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;