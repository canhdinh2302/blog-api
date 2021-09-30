const formatVote = require('./format');

module.exports = async (ctx, next) => {
  await next();

  const blog = {...ctx.body}

  if (!blog.id) {
    ctx.response.notFound()
    return
  }

  ctx.body = {
    ...blog,
    votes: formatVote(blog.votes, ctx.state.user)
  }
};
