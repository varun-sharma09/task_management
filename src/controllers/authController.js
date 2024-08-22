const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { registerSchema, loginSchema } = require('../validations/authValidation');

// Register user
const register = async (req, res) => {
    try {
        // Validate the request body using Joi
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ code: 400, status: 'Error', message: error.details[0].message });
        }

        const { username, email, password } = req.body;

        // Check if the username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ code: 400, status: 'Error', message: 'Username already taken' });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ code: 400, status: 'Error', message: 'Email already in use' });
        }

        // Create a new user
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ code: 201, status: 'Success', message: 'User registered successfully', data: user });
    } catch (err) {
        res.status(500).json({ code: 500, status: 'Error', message: err.message });
    }
};


// Login user
const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ code: 400, status: 'Error', message: error.details[0].message });
        }
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ code: 400, status: 'Error', message: 'Invalid credentials' });

        // Check if the password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ code: 400, status: 'Error', message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

        // Send response with user data and token
        res.json({
            code: 200,
            status: 'Success',
            message: 'Login successful',
            data: {
                user,
                token
            }
        });
    } catch (err) {
        res.status(500).json({ code: 500, status: 'Error', message: err.message });
    }
};

module.exports = {
    register, login
};
