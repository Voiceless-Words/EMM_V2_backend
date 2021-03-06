//Dependencies
const boom = require('boom');

//Get data model for agents
const Agent = require('../models/agents');
const nodeMailer = require('nodemailer');

//Get all the users from the Agents collection
exports.getAgents = async (req, res) => {
    try {
        await Agent.find({}, (err, users) => {
            if (err)
            {
                console.log(err);
                res.status(500).send({"User": "Internal error can not get the users"});
            } else if (users.length === 0) {
                res.status(204).send({"User": "No matches found"});
            } else {
                res.status(200).send(users);
            }
        });
    } catch (err) {
        throw boom.boomify(err);
    }
}

//get a single agent by ID
exports.getOneAgent = async (req, res) => {
    try {
        const id = req.params.id;
        await Agent.findById(id, (err, user) => {
            if (err)
            {
                console.log(err);
                res.status(500).send({"User": "Internal server error can not the user"});
            } else if (!user) {
                res.status(204).send({"User": "No match found"});
            } else {
                res.status(200).send(user);
            }
        });
    } catch (err) {
        throw boom.boomify(err);
    }
}

//add a new agent to the database
exports.addAgent = async (req, res) => {
    try {
        const agent = new Agent(req.body);
        agent.save().then(agent => {
            res.status(200).send({"User":"User was added successfully to the database"});
        })
        .catch(err => {
            res.status(400).send({"User":"Unable to add the user to the database"});
        });
    } catch (err) {
        throw boom.boomify(err);
    }
}

//forgot password check email exists
exports.forgotPassword = async (req, res) => {
    try {

        await Agent.find({Email:req.body.Email}, (err, doc) => {
            if (err)
            {
                console.log(err);
                res.send({"User":"Internal server error can not update the user"});
            } else if (doc.length === 0) {
                res.status(400).send({"User":"The email you entered does not exist"});
            } else {
                let transporter = nodeMailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'inspections.emm@gmail.com',
                        pass: 'Inspect@2019'
                    }
                });
                let mailOptions = {
                    from: '"EMM Inspections" <inspections.emm@gmail.com>',
                    to: req.body.Email, 
                    subject: 'Reset Password',
                    html: '<b>Follow the link to reset</b>'
                };
          
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.status(400).send({"User": "Email failed to send"});
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    res.status(200).send({"User":"Please check your email for instructions to change password"});
                    });
            }
        }); 
    } catch (err) {
        throw boom.boomify(err);
    }
}

//update an existing agent information
exports.updateAgent = async (req, res) => {
    try {
        const id = req.params.id;
        const agent = req.body;
        const {...updateData } = agent;
        await Agent.findByIdAndUpdate(id, updateData, {new: true}, (err, update) => {
            if (err)
            {
                console.log(err);
                res.send({"User":"Internal server error can not update the user"});
            } else if (!update) {
                res.status(400).send({"User":"Unable to update check your id"});
            } else {
                res.status(200).send({"User":"User successfully updated"});
            }
        }); 
    } catch (err) {
        throw boom.boomify(err);
    }
}

//Deactivate an agent from gaining access
exports.deactivateAgent = async (req, res) => {
    try {
        const id = req.params.id;
        const agent = req.body;
        const {...updateData } = agent;
        await Agent.findByIdAndUpdate(id, updateData, {new: true}, (err, update) => {
            if (err)
            {
                console.log(err);
                res.send({"User":"Internal server error can not update the user"});
            } else if (!update) {
                res.status(400).send({"User":"Unable to deactivate check your id"});
            } else {
                res.status(200).send({"User":"User successfully deactivated"});
            }
        });   
    } catch (err) {
        throw boom.boomify(err);
    }
}

//Activate an agent to gain access again
exports.activateAgent = async (req, res) => {
    try{
        const id = req.params.id;
        const agent = req.body;
        const {...updateData } = agent;
        await Agent.findByIdAndUpdate(id, updateData, {new: true}, (err, update) => {
            if (err)
            {
                console.log(err);
                res.send({"User":"Internal server error can not update the user"});
            } else if (!update) {
                res.status(400).send({"User":"Unable to activate check your id"});
            } else {
                res.status(200).send({"User":"User successfully activated"});
            }
        });  
    } catch (err) {
        throw boom.boomify(err);
    }
}

//Delete an agent
exports.deleteAgent = async (req, res) => {
    try {
        const id = req.params.id;
        await Agent.findByIdAndRemove(id, (err, doc) => {
            if (err)
            {
                console.log(err);
                res.status(400).send({"User":"User was unable to delete"});
            } else {
                res.status(200).send({"User": "User was successfully deleted"});
            }
        });
    } catch (err) {
        boom.boomify(err);
    }
}