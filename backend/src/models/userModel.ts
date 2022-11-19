import { Schema, model, InferSchemaType } from "mongoose";

interface IUser {
  email: string;
  password: string;
  roles: string[];
}

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles:[{type: String, default: "user"}]
});

const User = model("User", userSchema);

export default User;
