import User from "../models/User";

export async function getUser (userId) {
    const user = await User.findById(userId).select("-password")

    return user
}