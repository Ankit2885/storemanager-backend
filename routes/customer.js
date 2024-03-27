const express = require('express');
const router = express.Router();
const { fetchAllCustomers, createCustomer } = require('../controllers/customer');

router.post('/fetch-all-customers', fetchAllCustomers)
// router.post('/fetch-customer', fetchCustomer)
router.post('/create-customer', createCustomer)
// router.post('/update-customer', updateProduct)
// router.post('/delete-customer', deleteProduct)

module.exports = router