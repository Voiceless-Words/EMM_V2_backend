//Import agent controller
const agentsController = require('../controllers/agentsController');

const routes = [
    {
        method: 'GET',
        url: '/users',
        handler: agentsController.getAgents
    },
    {
        method: 'GET',
        url: '/users/:id',
        handler: agentsController.getOneAgent
    },
    {
        method: 'POST',
        url: '/users/add',
        handler: agentsController.addAgent
    },
    {
        method: 'PUT',
        url: '/users/update/:id',
        handler: agentsController.updateAgent
    },
    {
        method: 'PUT',
        url: '/users/deactivate',
        handler: agentsController.deactivateAgent
    },
    {
        method: 'PUT',
        url: '/users/activate',
        handler: agentsController.activateAgent
    },
    {
        method: 'DELETE',
        url: '/users/delete',
        handler: agentsController.deleteAgent
    }
]

module.exports = routes;