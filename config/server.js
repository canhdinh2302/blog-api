module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'production') {
    return {
      url: env('MY_HEROKU_URL'),
      admin: {
        auth: {
          secret: env('ADMIN_JWT_SECRET'),
        },
      },
    }
  }

  return {
    host: env('APP_HOST', '0.0.0.0'),
    port: env.int('APP_PORT', 1337),
    admin: {
      auth: {
        secret: env('ADMIN_JWT_SECRET'),
      },
    },
  }
}
