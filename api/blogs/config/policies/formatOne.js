const formatVote = require('./format');

module.exports = async (ctx, next) => {
  await next();

  const blog = {...ctx.body}

  ctx.body = {
    ...blog,
    votes: formatVote(blog.votes, ctx.state.user)
  }
};
