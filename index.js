'use strict';
const client = require('./db.js');
const Hapi = require('@hapi/hapi');
const Path = require('path');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
        
    });
    await server.register(require('@hapi/inert'));
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory: {
              path: 'dist'
          }
      }
    });
    server.route({
        method: 'GET',
        path: '/api/personalInfo',
        handler: async (request, h) => {
            await client.connect();
            const db = client.db('firstproject');
                
            const collection = db.collection('personalInfo');
            const info = await collection.find({}).toArray();
            return info;
          
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();