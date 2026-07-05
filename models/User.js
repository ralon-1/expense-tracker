import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },

    profilePicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
//  hash password before saving
userSchema.pre('save', async function (){
    if(!this.isModified('password')) return ;
    this.password=await bcrypt.hash(this.password,10);
    
    console.log('password hashed succesfully')
    return;
});
// Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
