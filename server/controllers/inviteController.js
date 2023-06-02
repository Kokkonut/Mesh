const sendInvite = require('../services/inviteService');
const Invite = require('../models/Invite');
const Organization = require('../models/Organization');

exports.inviteUser = async (req, res) => {
  const { email } = req.body;
  const { organizationId } = req.params;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Create the invite document
    const invite = new Invite({
      email: email,
      organization: organizationId,
    });
    await invite.save();

    await sendInvite(email, invite._id);

    return res.status(200).json({ message: "Invitation sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getInviteDetails = async (req, res) => {

    try {
      const invite = await Invite.findById(req.params.inviteId).populate('organization');

      if (!invite) {
        return res.status(404).json({ message: 'Invite not found' });
      }
  
      return res.json({ organizationName: invite.organization.name });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };