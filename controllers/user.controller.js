const Users = require("../models/User");

const userCtrl = {
  getAllUsers: async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addUser: async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
      const user_email = await Users.findOne({ email });
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ msg: " Please enter all fields" });
      }
      if (user_email)
        return res.status(400).json({ message: "This email already exists." });
      const newUser = new Users({
        firstName,
        lastName,
        email,
      });
      await newUser.save();
      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ msg: " Please enter all fields" });
      }
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          firstName,
          lastName,
          email,
        },
        {
          new: true,
        }
      );
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await Users.findByIdAndDelete(req.params.id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
