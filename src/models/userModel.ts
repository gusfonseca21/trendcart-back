import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Defina um nome"],
  },
  email: {
    type: String,
    required: [true, "Defina um email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: "Defina um email válido",
    },
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Defina uma senha"],
    minlength: 4,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirme a senha"],
  },
});

const User = model("User", userSchema);

export default User;
