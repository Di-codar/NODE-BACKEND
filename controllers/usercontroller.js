import User from "../models/user.js"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../sendEmail.js";

const forsignup = async (req, res) => {
  let { fullname, email, password } = req.body;

  let hashedPassword = await bcrypt.hash(password, 10)

  const newuser = await User.create({
    fullname,
    email,
    password : hashedPassword
  });
  
  const welcomeMail =`
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #bfdbe4ff; padding: 20px; border-radius: 5px;">
     <h1><center>Welcome to Our Platform </center> <img scr="https://res.cloudinary.com/dh8dtvvy6/image/upload/v1752755027/Blog_pictures/vdktuipzojruyrasa9hw.jpg" width="70px"/></h1>
     <p>Hi ${fullname},</p>\n\n
     <p>Welcome to our platform! We're excited to have you on board.\n\n</p>
     <ol>
       <li>Explore our features and services.</li>
       <li>Stay updated with our latest news.</li>
       <li>Feel free</li>
       </ol>
       <p>Best regards,\n\n</p>
       <p>The Team</p>
       </p> contact us at:< href="mailto:${process.env.EMAIL_USER}
       
   <div>
   `;

   await sendEmail(email, "Welcome to Our Platform", welcomeMail);
   
  res.status(201).json({ message: "User registered successfully" });
}

const forlogin = async (req, res) => {
  let { email, password } = req.body;

  let checkEmail = await User.findOne({ email });

  if (!checkEmail) {
    return res.status(404).json({ message: "Email not found" });
  }

  let checkPassword = await bcrypt.compare(password, checkEmail.password);

  if (!checkPassword) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  let token = jwt.sign(
    { id: checkEmail._id, email: checkEmail.email, role: checkEmail.role },
     process.env.SECRET_KEY,
     {expiresIn: '3h'}
  );

  res.status(200).json({ message: "Login successful", token});
}


  const getAllUsers = async (req, res) => {
    const myUsers = await User.find();

    if (!myUsers) {
        return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(myUsers);
}

const get1user = async (req,res)=>{
    let {id} = req.params;

    const oneUser = await User.findById(id);

    if (!oneUser) return res.status(404).json ({message:"No user found"});

    res.status(200).send(oneUser)
}

 const del1user = async (req,res) => {
    let {id} = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if(!deletedUser) return res.status(404).json({message:"No user found"});

    res.status(200).json({message: "User deleted successfuly"})
 }

 const update1user = async (req,res) => {
    let {id} = req.params;
    let newData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, newData, {new: true});

    if(!updatedUser) return res.status(404).json({message:"No user found"});

    res.status(200).json({message: "User updated successfuly", updatedUser});
 }

export{
    getAllUsers,
    get1user,
    del1user,
    update1user,
    forsignup,
    forlogin
}