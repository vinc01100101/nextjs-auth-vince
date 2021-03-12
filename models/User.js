import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    maxlength: [40, "Email cannot be more than 40 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    maxlength: [20, "Password cannot be more than 20 characters"],
  },
});
UserSchema.pre("save", () => console.log("Hello from account pre save"));
UserSchema.post("save", () => console.log("Hello from account post save"));

UserSchema.plugin(uniqueValidator);
export default mongoose.models.User || mongoose.model("User", UserSchema);
