const mongoose = require("mongoose"); // mongoose is used to define our schema
const validator = require("validator"); // this is to check if our email is valid
const bcrypt = require("bcrypt"); // bcrypt is used for hashing passwords
const jwt = require("jsonwebtoken"); // jwt is used for generating tokens
const crypto = require("crypto"); // crypto from nodejs(built-in) used for reset password tokens

// Defining the Schema
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: [true, "Email already in use"],
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("please provide a valid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "Password must be at least 8 characters long"],
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password must mot contain 'password'");
        }
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Hashing password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // to check if password isn't changed
  const salt = await bcrypt.genSalt(10); // to generate salt
  this.password = await bcrypt.hash(this.password, salt); // to hash the password
  next();
});

//Compare entered password with hashed password
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

//Generating a JWT token
userSchema.methods.generateToken = function () {
  // jwt.sign(payload, secret, options)
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
      role: this.role,
      firstName: this.firstName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24hr" } // token will expire in 24 hours
  );
};

//Generate reset password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // expires in 10 minutes
  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
