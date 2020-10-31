'use strict';
const client = require('./db.js');
const Hapi = require('@hapi/hapi');
const Path = require('path');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
        routes: {
          cors: true
        }
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
    server.route({
      method: 'POST',
      path: '/api/personalInfo',
      handler: async (request, h) => {
        var payload = request.payload   // <-- this is the important line
    
        await client.connect();
        const db = client.db('firstproject');
            
        const collection = db.collection('personalInfo');
        const info = await collection.insertOne(JSON.parse(payload));
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