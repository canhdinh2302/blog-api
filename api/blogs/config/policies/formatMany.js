const formatVote = require('./format')

module.exports = async (ctx, next) => {
  await next()

  const blogs = [...ctx.body]

  ctx.body = blogs.map((blog) => ({
    ...blog,
    votes: formatVote(blog.votes, ctx.state.user),
  }))
}
