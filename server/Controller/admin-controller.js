const User = require('../models/user-model');
const Contact = require('../models/contact-model')


const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({},{ password: 0 })
        if(!users || users.length === 0) {
            return res.status(404).json({message: "user didn't found"});
        }
        return res.status(200).json(users);
    } catch (error) {
            return res.status(404).json({message: "user didn't found"});
        next(error)
    }
}

// Edit Sing User Logic 
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id}, {password: 0})
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

// Update Users Logic 
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updateData = await User.updateOne(
            {_id: id},
            {
                $set: updatedUserData
            }
            )
        res.status(200).json(updateData)
    } catch (error) {
        next(error)
    }
}

// Delete Users Logic 
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const contacts = await Contact.deleteOne()
        res.status(200).json({ message: "User delete Successfully"})
    } catch (error) {
        next(error)
    }
}

// Delete Contact Logic 
const deleteContactById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const contact = await Contact.deleteOne({ _id: id });
  
      if (contact.deletedCount === 0) {
        return res.status(404).json({ message: "Contact not found" });
      }
  
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find()
        if(!contacts || contacts.length === 0) {
            return res.status(404).json({message: "contacts didn't found"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
            return res.status(404).json({message: "Contacts didn't found"});
        next(error)
    }
}

module.exports =  { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById };