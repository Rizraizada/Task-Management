const bcrypt = require('bcrypt');
const Employee = require('../models/employee');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Set the session user
    req.session.user = employee;

    // If login is successful, redirect to employee.ejs page with user data
    res.render('employee', { employee });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again' });
    }
    res.redirect('/login');
  });
};
