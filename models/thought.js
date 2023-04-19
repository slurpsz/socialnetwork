const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You must leave a thought!',
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
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// thoughtSchema.virtual('reactionCount').get(() => {
//   return this.reactions.length;
// });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;