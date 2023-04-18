const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

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
      get: timestamp => dayjs(timestamp).format('MMM DD, YYYY, h:mm:ss a')
    },
    username: {
      type: String,
      required: true,
    },
  }
)

module.exports = thought;