const userSchema = require("../models/user.model");

// import userSchema from "../models/user.model";

 const register = async (req, res) => {
  try {
    const { phone } = req.body;


    const user = await userSchema.create({ phone });
    await user.save()
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("SERVER ERROR: | register", error);
    res.status(500).json({ error: "Server error | Register" });
  }
}

 const updatePassword = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await userSchema.findOne({ phone }) || null // null = false
    //    7    true
    if(password.trim() || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" })
    }

    if(user) {
        user.password = password
        await user.save()
        return res.status(200).json({ message: "Password updated successfully" })
    } else {
        return res.status(404).json({ message: "User not found" })
    }

  } catch (e) {
    console.log("SERVER ERROR: | register", e);
    res.status(500).json({ e: "Server error | Register" });
  }
}

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    const user = await userSchema.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.authMethod !== "phone") {
      return res.status(400).json({ message: "Login is only allowed for phone-authenticated users" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ phone: user.phone, id: user._id });

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("SERVER ERROR: | login", error);
    res.status(500).json({ error: "Server error | login" });
  }
};

module.exports = {
  register,
  updatePassword
}
