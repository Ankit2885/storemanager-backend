const Customer = require('../models/customerModel')

exports.fetchAllCustomers = async (req, res, next) => {
    try {
        const { userId } = req.body
        const allCustomers = await Customer.find({ userId: userId });
        res.json({
            status: true,
            data: allCustomers,
            message: "Fetch User Successfully"
        })
    } catch (error) {
        console.error(error.message);
        res.json({
            status: false,
            data: [],
            message: "Internal Server Error"
        })
    }
}

exports.createCustomer = (req, res, next) => {
    const { name, phone, userId } = req.body
    if (name && phone && userId) {
        Customer.findOne({ phone: phone }).then((userExist) => {
            if (userExist) {
                res.json({
                    status: false,
                    data: {},
                    message: "Customer Already Exists"
                })
            } else {
                const customer = new Customer({ name, phone, userId })
                customer.save().then((data) => {
                    res.json({
                        status: true,
                        data: data,
                        message: "User Created Successfully"
                    })
                }).catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: err,
                    })
                })
            }

        }).catch((err) => {
            res.status(500).json({
                status: false,
                message: err,
            })
        })
    } else {
        res.json({
            status: false,
            data: {},
            message: "Please Enter Valid Inputs"
        })
    }
}
