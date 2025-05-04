const { adminModel, userModel }=require("../db");
function adminRouter(app){
    app.post("/admin/signup",async function(req,res){
        try {
            const {email, password, firstName, lastName} = req.body;
            
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({
                    message: "All fields are required"
                });
            }

            const newAdmin = await adminModel.create({
                email,
                password,
                firstName,
                lastName
            });

            res.status(201).json({
                message: "admin signedup successfully",
                admin: newAdmin
            });
        } catch(e) {
            console.error("Error in admin signup:", e);
            res.status(500).json({
                message: "Error in admin signup",
                error: e.message
            });
        }
    });
    app.post("/admin/signin", async function(req, res) {
        const { email, password } = req.body;
        try {
            const admin = await adminModel.findOne({ email: email });
    
            if (!admin || admin.password !== password) {
                return res.status(401).json({
                    message: "Invalid Id or Password"
                });
            }
    
            res.json({
                message: "admin signedin",
                admin: {
                    id: admin._id,
                    email: admin.email,
                    firstName: admin.firstName,
                    lastName: admin.lastName
                }
            });
        } catch (e) {
            console.error("Error during admin signin:", e);
            res.status(500).json({
                message: "error aya bhai",
                error: e.message
            });
        }
    });
    app.get("/admin/finduser/profile", async function (req, res) {
        try {
            const users = await userModel.find();
            res.status(200).json({
                message: "All user profiles fetched successfully",
                users: users
            });
        } catch (e) {
            console.error("Error fetching user profiles:", e);
            res.status(500).json({
                message: "Error fetching user profiles",
                error: e.message
            });
        }
    });

    app.put("/admin/update/profile", async function (req, res) {
        const { email } = req.body;
    
        try {
            const user = await userModel.findOne({ email: email });
    
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
    
            const newAdmin = await adminModel.create({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            });
    
            res.status(200).json({
                message: "User promoted to admin successfully",
                admin: newAdmin
            });
        } catch (e) {
            console.error("Error promoting user:", e);
            res.status(500).json({
                message: "Error promoting user",
                error: e.message
            });
        }
    });
    app.delete("/admin/users/:userId",function(req,res){
        res.json({
            message:"Delete a Specific user"
        })
    })
  
    app.delete("/admin/posts/:postId",function(req,res){
        res.json({
            message:"Force delete a post"
        })
    })
}
module.exports={
    adminRouter:adminRouter
}