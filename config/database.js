const parse = require('pg-connection-string').parse
const config = parse(process.env.DATABASE_URL)

module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'production') {
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password,
            ssl: {
              rejectUnauthorized: false,
            },
          },
          options: {
            ssl: true,
          },
        },
      },
    };
  }

  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'mysql',
          host: env('DATABASE_HOST'),
          port: env.int('DATABASE_PORT'),
          database: env('DATABASE_NAME'),
          username: env('DATABASE_USERNAME'),
          password: env('DATABASE_PASSWORD'),
        },
        options: {},
      },
    },
  }
}