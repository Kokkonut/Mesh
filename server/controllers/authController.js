const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/passport");
const User = require("../models/User");
const Organization = require("../models/Organization");
const Invite = require("../models/Invite");

//login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //added manager flag to token
    const token = jwt.sign(
      { id: user.id, role: user.manager ? "manager" : "user" },
      jwtSecret,
      { expiresIn: "1d" }
    );
    //max age 24 hours for cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "none" : undefined,
    });

    res.status(200).json({ message: "Login successful" });
    // res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Create the new user
    const user = new User({ firstName, lastName, email, password });
    await user.save();

   //added manager flag to token
   const token = jwt.sign(
    { id: user.id, role: user.manager ? "manager" : "user" },
    jwtSecret,
    { expiresIn: "1d" }
  );
  //max age 24 hours for cookie
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: isProduction ? "none" : undefined,
  });

    res.status(200).json({ message: "User created", token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//signup with invite
exports.signupWithInvite = async (req, res) => {
  try {
    const { firstName, lastName, email, password, inviteId } = req.body;

    // Look for the corresponding invite
    const invite = await Invite.findById(inviteId).populate("organization");
    if (!invite) {
      return res.status(400).json({ message: "Invalid invite" });
    }

    if (invite.email !== email) {
      return res.status(400).json({ message: "Email does not match invite" });
    }

    // Create the new user
    const user = new User({ firstName, lastName, email, password });
    await user.save();

    // Add the user to the organization directly
    const organization = await Organization.findById(invite.organization);
    organization.employees.push(user);
    await organization.save();

    // Remove the used invite
    await invite.deleteOne();

   //added manager flag to token
   const token = jwt.sign(
    { id: user.id, role: user.manager ? "manager" : "user" },
    jwtSecret,
    { expiresIn: "1d" }
  );
  //max age 24 hours for cookie
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: isProduction ? "none" : undefined,
  });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
