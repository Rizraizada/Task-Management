// models/employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    address: { type: String, required: true },
    active: { type: Number, default: 1 } // 1 for active, 0 for inactive
});

module.exports = mongoose.model('Employee', employeeSchema);
