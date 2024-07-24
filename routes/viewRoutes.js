const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(viewsController.alerts);

router.get('/', authController.isLoggedIn, viewsController.getOverview);

// router.get('/home', authController.isLoggedIn, viewsController.getOverview);

// router.get('/track/:slug', authController.isLoggedIn, viewsController.getTour);
// router.get('/', authController.isLoggedIn, viewsController.getLoginForm);
// router.get('/me', authController.protect, viewsController.getAccount);

// router.get('/my-tours', authController.protect, viewsController.getMyTours);

// router.post(
//     '/submit-user-data',
//     authController.protect,
//     viewsController.updateUserData
// );

module.exports = router;