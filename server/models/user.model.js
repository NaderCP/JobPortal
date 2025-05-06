import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';


const UserSchema = new Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      enum: {
        values: ['recruiter', 'jobseeker'],
        message: '{VALUE} is not a supported user type. Please choose recruiter or jobseeker.'
      }
    }
  }, {timestamps: true});
  
  // Add a virtual field for confirm password
  UserSchema.virtual('confirmPassword')
    .get( function() {
      return this._confirmPassword;
    })
    .set( function(value) {
      this._confirmPassword = value;
    });
  
  // Add validation for confirm password
  UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });
  
  // Hash password before saving
  UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });
  
  const User = model("User", UserSchema);
  export default User;  