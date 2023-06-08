const User = require("../models/User");

// @desc    Get all users
exports.getUserData = async (req, res) => {
  console.log("SERVER: getUserData Called....");
  try {
    const user = await User.findById(req.user.id).populate("organizations.org");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get a single user filtered by org
exports.getUser = async (req, res) => {
  console.log("SERVER: getUser Called....");
  console.log("SERVER: getUser req.params.userId: ", req.params.userId);
  try {
    const user = await User.findById(req.params.userId);
    console.log("SERVER: getUser user: ", user);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Filter the organizations array to find the correct one
    const organization = user.organizations.find(org => org.org.toString() === req.params.orgId);

    // Check if the organization data was found
    if (!organization) {
      return res.status(404).json({
        message: 'No organization found for this user with the provided orgId'
      });
    }

    // Return the required data
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      organization: {
        fte: organization.fte,
        title: organization.title,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  console.log("SERVER: updateUser Called....");
  try {
    // Fetch the user to update
    const user = await User.findById(req.params.userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Find the organization in the user's organizations array
    const organizationIndex = user.organizations.findIndex(org => org.org.toString() === req.params.orgId);

    // Check if the organization data was found
    if (organizationIndex === -1) {
      return res.status(404).json({
        message: 'No organization found for this user with the provided orgId'
      });
    }

    // Update the organization's information
    user.organizations[organizationIndex].fte = req.body.fte || user.organizations[organizationIndex].fte;
    user.organizations[organizationIndex].title = req.body.title || user.organizations[organizationIndex].title;

    // Save the updated user
    await user.save();

    // Return the updated user
    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
