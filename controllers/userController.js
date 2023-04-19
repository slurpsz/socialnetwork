const { User, Thought } = require('../models');

const userController = {
  // get all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((userData) => {
        res.json(userData);
      })
      .catch ((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'Cannot find user with this id!' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate (
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'Cannot find user with this id!'});
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  // delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'Cannot find user with this id!' });
        }
        res.status(200).json({ message: 'Successfully Deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  },
}

module.exports = userController;