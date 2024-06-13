const cors = require("cors")
const express =require("express")
const mongoose =require("mongoose")
const  bcryptjs = require("bcryptjs")
const {blogmodel}=require("./module/blog")

const jwt=require("jsonwebtoken")

mongoose.connect("mongodb+srv://abytomy:Aby2905@cluster0.zupck9h.mongodb.net/userblogDB?retryWrites=true&w=majority&appName=Cluster0")


const app=express()
app.use(cors())
app.use(express.json())
const generateHashedPassword=async (password)=>{
    const salt = await bcryptjs.genSalt(8)
    return bcryptjs.hash(password,salt)
}
  

app.post("/signUp",async(req,res)=>{
    let input=req.body
    let HashedPassword=await generateHashedPassword(input.password)
    console.log(HashedPassword)
    input.password=HashedPassword
    let blog=new blogmodel(input)
blog.save()
    res.json({"Status":"Success"})
})

///sign up
app.post("/signIN",(req,res)=>{
    let input=req.body
    blogmodel.find({"Email":req.body.Email}).then(
        (response)=>{
            if (response.length>0) {
                let dbPassword=response[0].password
                console.log(dbPassword)
                bcryptjs.compare(input.password,dbPassword,(error,isMatch)=>{
                    if (isMatch) {
                        //if token is success
                        jwt.sign({email:input.emailId},"blog-app",{expiresIn:"1d"},
                            (error,token)=>{
                                if (error) {
                                    res.json({"status":"unable to create token"})
                                    
                                } else {
                                    res.json({"status":"success","userid":response[0]._id,"token":token})
                                    
                                }
                            }
                        
                        )
                    } else {
                        res.json({"status":"incorrect"})
                    }
                })
                
            } else {
            res.json({"status":"user not found"})    
            }
            
        }

    ).catch()
})

app.listen(8080, ()=>{
    console.log("server running")

})