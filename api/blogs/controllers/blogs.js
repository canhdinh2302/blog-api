'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOneSlug(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.services.blogs.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.blogs });
  }
}
