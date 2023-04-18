const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true, 'You must leave a thought',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:
    }
  }
)

module.exports = thought;