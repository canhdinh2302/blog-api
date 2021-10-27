module.exports = ({ env }) =>
  env('MY_HEROKU_URL')
    ? {
        url: env('MY_HEROKU_URL'),
        admin: {
          auth: {
            secret: env('ADMIN_JWT_SECRET'),
          },
        },
      }
    : {
        host: env('APP_HOST', '0.0.0.0'),
        port: env.int('APP_PORT', 1337),
        admin: {
          auth: {
            secret: env('ADMIN_JWT_SECRET'),
          },
        },
      }
