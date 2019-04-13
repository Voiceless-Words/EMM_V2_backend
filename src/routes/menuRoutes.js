//Import agent controller
const menuController = require('../controllers/menuController');

const routes = [
    {
        method: 'GET',
        url: '/jobs',
        handler: menuController.getCompletedJobs
    },
    {
        method: 'GET',
        url: '/jobs/:id',
        handler: menuController.getCompletedJob
    },
    {
        method: 'POST',
        url: '/jobs/images',
        handler: menuController.getJobImages
    },
    {
        method: 'POST',
        url: '/jobs/search',
        handler: menuController.searchJobs
    },
    {
        method: 'POST',
        url: '/jobs/adminsearch',
        handler: menuController.searchJobsAdmin
    },
    {
        method: 'POST',
        url: '/jobs/reportSend',
        handler: menuController.sendReport
    },
    {
        method: 'PUT',
        url: '/jobs/:id',
        handler: menuController.reviewOneJob
    },
    {
        method: 'PUT',
        url: '/jobs',
        handler: menuController.reviewAllJobs
    }
]

module.exports = routes;