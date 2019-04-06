//Require external modules
const mongoose = require('mongoose');
const config = require('./config.json');
const routes = require('./routes/agentRoutes');
//require the fastify framework and instantiate it
const fastify = require('fastify')
({
    logger: true
});


//Initialising our routes
routes.forEach((route, index) => {
    fastify.route(route);
});

//Connecting to the database
mongoose.set('useCreateIndex', true);
 
mongoose.connect(config.database_url ,  { useNewUrlParser: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err))

//Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world'};
});

//Running the server
const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.log.info(`Server listening on ${fastify.server.address().port}` );
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()