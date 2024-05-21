const express = require('express');
const adminController = require('../Controller/admin-controller');
const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router();


router.route('/users').get(authMiddleware,adminController.getAllUsers);

router.route('/users/update/:id').patch(authMiddleware,adminController.updateUserById);

router.route('/users/:id').get(authMiddleware,adminController.getUserById);

router.route('/contacts').get(authMiddleware,adminController.getAllContacts)

router.route('/users/delete/:id').delete(authMiddleware, adminController.deleteUserById)

router.route('/contacts/delete/:id').delete(authMiddleware, adminController.deleteContactById)

module.exports = router;