const fastify = require('fastify')({ logger: true });
const socketio = require('socket.io');

const server = fastify.server;
const io = socketio(server);

const cors = require('@fastify/cors');

fastify.register(cors, {
    origin: '*',
});

// Endpoint POST untuk /cessa
fastify.post('/cessa', async (request, reply) => {
    const data = request.body;
    io.emit('cessa', data);
    return { message: 'Event cessa broadcasted', data };
});

// Endpoint POST untuk /siorta
fastify.post('/siorta', async (request, reply) => {
    const data = request.body;
    io.emit('siorta', data);
    return { message: 'Event siorta broadcasted', data };
});

// Endpoint POST dinamis untuk /bebas atau apa saja
fastify.post('/:custom', async (request, reply) => {
    const { custom } = request.params; // Menangkap path dinamis
    const data = request.body;
    io.emit(custom, data); // Broadcast event sesuai dengan nama path
    return { message: `Event ${custom} broadcasted`, data };
});

fastify.listen({ port: 9900 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Server listening at ${address}`);
});
