//Dependencies
const boom = require('boom');

//Get data model for agents
const Agent = require('../models/agents');

//Get all the users from the Agents collection
exports.getAgents = async (req, reply) => {
    try {
        const agents = await Agent.find();
        return agents;
    } catch (err) {
        throw boom.boomify(err);
    }
}

//get a single agent by ID
exports.getOneAgent = async (req, reply) => {
    try {
        const id = req.params.id;
        const agent = await Agent.findById(id);
        return agent;
    } catch (err) {
        throw boom.boomify(err);
    }
}

//add a new agent to the database
exports.addAgent = async (req, reply) => {
    try {
        const agent = new Agent(req.body);
        return agent.save();
    } catch (err) {
        throw boom.boomify(err);
    }
}

//update an existing agent information
exports.updateAgent = async (req, reply) => {
    try {
        const id = req.params.id;
        const agent = req.body;
        const {...updateData } = agent;
        const update = await Agent.findByIdAndUpdate(id, updateData, {new: true});
        return update;  
    } catch (err) {
        throw boom.boomify(err);
    }
}

//Deactivate an agent from gaining access
exports.deactivateAgent = async (req, reply) => {
    try {
        const id = req.params.id;
        const agent = req.body;
        const {...updateData } = agent;
        const update = await Agent.findByIdAndUpdate(id, updateData, {new: true});
        return update;  
    } catch (err) {
        throw boom.boomify(err);
    }
}

//Activate an agent to gain access again
exports.activateAgent = async (req, reply) => {
    try{
        const id = req.params.id;
        const agent = req.body;
        const {...updateData } = agent;
        const update = await Agent.findByIdAndUpdate(id, updateData, {new: true});
        return update;  
    } catch (err) {
        throw boom.boomify(err);
    }
}

//Delete an agent
exports.deleteAgent = async (req, reply) => {
    try {
        const id = req.params.id;
        const agent = await Agent.findByIdAndRemove(id);
        return agent;
    } catch (err) {
        boom.boomify(err);
    }
}