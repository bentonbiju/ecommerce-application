const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const user = require('../models/user')
router.post('/register', async (req, res) => {
    console.log(req.body)
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const userData = {
            username: req.body.username,
            password: hashedPassword,
        };
          
          // Directly push the JSON object into the database
        user.create(userData)
        .then(() => {
            console.log('User saved successfully');
            res.status(201).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
            console.error('Error saving user:', error);
            res.status(500).json({ error: 'Error saving user to the database' });
        });
    }
    catch{
        res.status(500).send()
    }
});

router.post('/login', async (req,res) =>{
    const username = req.body.username;
    const login_user = await user.findOne({username});
    if (!login_user) {
        return res.status(404).json({ message: 'User not found' }); // Return 404 if user not found
    }
    try{
        if(await bcrypt.compare(req.body.password, login_user.password))
        {
            req.session.user = username
            return res.status(200).send()
        }
        else{
            return res.status(401).send()
        }
    }
    catch{
        res.status(500).send()
    }
})

router.get('/session', async (req, res) => {
    if (req.session.user) {
        return res.status(200).json(req.session.user);
    } else {
        return res.status(401).send();
    }
});


module.exports = router;