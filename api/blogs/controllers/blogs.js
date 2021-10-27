'use strict'
const { sanitizeEntity } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOneSlug(ctx) {
    const { slug } = ctx.params
    const blog = await strapi.services.blogs.findOne({ slug })
    return sanitizeEntity(blog, { model: strapi.models.blogs })
  },

  async vote(ctx) {
    const currentUser = ctx.state.user

    if (!currentUser || !currentUser.id) {
      ctx.response.unauthorized()
      return
    }

    const { slug } = ctx.params
    let blog = await strapi.services.blogs.findOne({ slug })

    if (!blog || !blog.id) {
      ctx.response.notFound()
      return
    }

    let vote = await strapi.services.votes.findOne({ blog: blog.id, user: currentUser.id })
    const point = ctx.request.body.point || 5

    if (vote && vote.id) {
      vote = await strapi.services.votes.update({ id: vote.id }, { point })
    } else {
      vote = await strapi.services.votes.create({
        blog: blog.id,
        user: currentUser.id,
        point,
      })
    }

    blog = await strapi.services.blogs.findOne({ slug })

    return sanitizeEntity(blog, { model: strapi.models.blogs })
  },
}
