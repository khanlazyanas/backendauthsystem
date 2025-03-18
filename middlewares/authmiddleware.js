import jwt from "jsonwebtoken" 

const authmiddleware =(req,res,next)=>{
    const token = req.cookies?.token;

  if(!token) return res.status(401).json({success:false,message:"Token not found"})

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.status(403).json({success:false,message:"Invalid Token"})

            req.user=user;
            next()
    })
}

export default authmiddleware