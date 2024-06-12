import { connectToDB } from "@/lib/database";
import User from "@/models/user";
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const { userId } = params;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return new Response(
                "no user found",

                { status: 404 }
            );
        }
        const { password, ...others } = user._doc;
        return new Response(
            JSON.stringify(others),

            { status: 200 }
        );
    } catch (error) {
        return new Response("Failed to fetch users", {
            status: 500
        });
    }
};
export const POST = async (request, { params }) => {
    const { userId } = params;
    try {
        await connectToDB();

        const user = await User.findById(userId).lean();
        if (!user) return new Response("User Not Found", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response("Error getting User, Internal server error", {
            status: 500
        });
    }
};

export const PATCH = async (request, { params }) => {
    const { userId } = params;
    const updatedUserData = await request.json();

    try {
        await connectToDB();

        // Find the existing user by ID
        const existingUser = await User.findById(userId);
        const foundUser = await User.findOne({
            email: updatedUserData.email
        });

        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }
        if (foundUser && foundUser._id !== userId) {
            return new Response(
                "duplicate User: user with username already exist",
                {
                    status: 404
                }
            );
        }

        // Update the user with new data using the set method
        existingUser.set(updatedUserData);

        await existingUser.save();

        return new Response("Successfully updated the User", {
            status: 200
        });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { userId } = params;

    try {
        await connectToDB();

        // Find the user by ID and remove it
        const deletedUser = await User.findOneAndDelete({ _id: userId });

        if (!deletedUser) {
            return new Response("User not found", { status: 404 });
        }

        return new Response("User deleted successfully", {
            status: 200
        });
    } catch (error) {
        return new Response("Error deleting user", { status: 500 });
    }
};
