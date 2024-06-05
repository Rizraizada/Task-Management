const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
const ejs = require('ejs');
const taskController = require('./controllers/taskController');
const registrationController = require('./controllers/registrationController');
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/authMiddleware');
const homeController = require('./controllers/homeController'); // Add this line


// Connect to MongoDB
mongoose.connect('mongodb://localhost/mango', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;

db.once('open', function () {
  console.log('db connected');
});

db.on('error', function (err) {
  console.log('connection error', err);
});

// Initialize app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));

app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Generate a random secret key for sessions
const sessionSecret = crypto.randomBytes(64).toString('hex');

// Session management
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // In production, set secure to true
}));

// Home route
app.get('/', homeController.showHomePage);


// Protect taskController routes with authentication middleware
app.use('/articles', authMiddleware);

app.get('/articles/add', taskController.addTaskForm);
app.post('/articles/add', taskController.createTask);
app.post('/articles/edit/:id', taskController.updateTask);
app.post('/articles/delete/:id', taskController.deleteTask);

// Route to show the registration form
app.get('/register', function(req, res) {
  res.render('registration'); // Assuming 'registration.ejs' exists in the 'views' directory
});

app.post('/register', registrationController.register); // Handle registration

// Route to show the login form
app.get('/login', function(req, res) {
  res.render('login'); // Assuming 'login.ejs' exists in the 'views' directory
});

app.post('/login', authController.login); // Handle login

// About route
app.get('/about', function (req, res) {
  res.render('about'); // Assuming 'about.ejs' exists in the 'views' directory
});

// Add the logout route
app.get('/logout', authController.logout);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
