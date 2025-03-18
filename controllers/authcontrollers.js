import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body; 

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({ name, email, password: hashedPassword, role }); 
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User Registered!",
        });


        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return  res.status(404).json({ success:false, message:"User not found"});

        const ispasswordvalid =await bcrypt.compare(password,user.password);
        if(!ispasswordvalid) return res.status(401).json({success:false, message:"Invalid password"})

            const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
            res.cookie("token",token,{httpOnly:true});
            res.json({success:true,message:"Login successfully",role:user.role})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
      res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" }); // ✅ Token remove
      res.status(200).json({ success: true, message: "Logged out successfully!" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Logout failed!" });
    }
  };
  

export const getuser = async(req,res)=>{
    const user = await User.findById(req.user.id)
    res.json(user)
}
