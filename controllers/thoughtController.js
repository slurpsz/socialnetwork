const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .sort ({ createdAt: -1 })
      .then ((thoughtData) => {
        res.json(thoughtData);
      })
      .catch ((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(400).json({ message: 'Cannot find thought with this id!'});
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then ((userData) => {
        if (userData) {
          return res.status(404).json({ message: 'Thought succesfully created but cannot find user with this id!'});
        }

         res.json({ message: 'Thought succesfully created!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, {runValidators: true, new: true })
      .then ((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'Cannot find thought with this id!' });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then ((thoughtData) => {
      if (!thoughtData) {
        return res.status(404).json({ message: 'Cannot find thought with this id!'});
      }
    })
  }
}

module.exports = thoughtController;