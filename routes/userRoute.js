const express = require('express');
const router = express.Router();
const User = require('../model/Users');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Get specific user
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Create a user
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        
        const user = User.findOne({ 
            email: req.body.email 
        }).then(user => {
            if (user) {
                return res.status(400).json({ email: "Email already exists" });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                newUser.save().then(user => res.json(user)).catch(err => console.log(err));
            }
        });
    } catch (err) {
        res.json({ message: err });
    }
}
);

// Delete a user
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete a user using email
router.delete('/:email', async (req, res) => {
    try {
        const removedUser = await User.remove({ email: req.params.email });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update a user
router.patch('/:email', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { email: req.params.email },
            { $set: { name: req.body.name } }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;