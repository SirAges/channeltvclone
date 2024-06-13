import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        roles: { type: [String], default: "user" }
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
