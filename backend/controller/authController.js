const UserModel = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body)
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409)
        .json({ message: 'User is already exist, you can login', success: false });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: 'Signup successfully', success: true
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server error.. ', success: false
    })
  }
}
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMessage = 'Auth failed email or password is wrong ';
    if (!user) {
      return res.status(403).json({ message: errorMessage, success: false })
    }
    const isPassword = await bcrypt.compare(password, user.password)
    // console.log("Password", isPassword)
    if (!isPassword) {
      return res.status(403).json({ message: errorMessage, success: false })
    }
    const jwtToken = jwt.sign({ email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.status(201).json({
      message: 'Login successfully', success: true,
      jwtToken,
      email,
      name: user.name
    })

  } catch (error) {
    res.status(500).json({
      message: 'Internal Server error.. ', success: false
    })
  }
}
module.exports = {
  signUp,
  logIn
}