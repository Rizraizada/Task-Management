// controllers/registrationController.js
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {

        console.log(req.body); // Log request body to check if data is being received

        const { username, email, password, designation, department, address } = req.body;

        // Check if the email is already registered
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new employee
        const employee = new Employee({
            username,
            email,
            password: hashedPassword,
            designation,
            department,
            address
        });

        // Save the employee to the database
        await employee.save();
        res.status(201).json({ message: 'Employee registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
