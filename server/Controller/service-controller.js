const Service = require('../models/service-model')

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if(!response){
            res.status(404).json({msg: "Services not found"})
        }
        res.status(200).json({msg: response})
    } catch (error) {
        console.log(`Service ${error}`)
    }
};

module.exports = services;