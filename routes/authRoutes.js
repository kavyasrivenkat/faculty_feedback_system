// routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Dummy user database (replace with a real database in production)
const users = [];

// routes/authRoutes.js

router.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user (using a dummy database for now)
        users.push({ email, password: hashedPassword });

        // Respond with success
        res.json({ success: true });
    } catch (err) {
        console.error("Error during registration:", err);
        res.json({ success: false, message: 'An error occurred during registration' });
    }
});


// Login endpoint
router.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = users.find(user => user.email === email);
    if (!user) return res.json({ success: false, message: 'Invalid credentials' });

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.json({ success: false, message: 'Invalid credentials' });

    // Send a success response
    res.json({ success: true });
});

module.exports = router;
