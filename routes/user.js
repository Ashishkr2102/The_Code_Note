const { userModel,adminModel } = require("../db");

function userRouter(app) {
    app.post("/user/signup", async function (req, res) {
        const { email, password, firstName, lastName } = req.body; //adding zod validation
        // todo hash the password so it should not stored in DB USING BCRYPT
        try {
            // Create the user and await the result
            const newUser = await userModel.create({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
            });

            // Send success response after user is created
            res.status(201).json({
                message: "User signed up successfully",
                user: newUser // Optionally return the created user
            });
        } catch (e) {
            console.error("Error creating user:", e);
            res.status(500).json({
                message: "Error signing up user",
                error: e.message
            });
        }
    });

    app.post("/user/signin", async function (req, res) {
        const { email, password } = req.body;

        try {
            const user = await userModel.findOne({ email: email }); // ← await here!

            if (!user || user.password !== password) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            res.json({
                message: "User signed in successfully",
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } catch (e) {
            console.error("Error during user signin:", e);
            res.status(500).json({
                message: "Error signing in user",
                error: e.message
            });
        }
    });

    app.post("/user/signout", function (req, res) {
        res.json({
            message: "User logged out"
        });
    });

    app.get("/user/blog", function (req, res) {
        res.json({
            message: "displaying blog"
        });
    });

    app.get("/user/profile", function (req, res) {
        res.json({
            message: "displaying user profile"
        });
    });
}

module.exports = {
    userRouter: userRouter
};
