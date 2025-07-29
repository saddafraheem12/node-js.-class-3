const express = require("express");
const fs = require("fs");
const router = express.Router();

// GET all users
router.get("/", (req, res) => {
    fs.readFile('./data/users.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ message: "Failed to read users file", error: err });

        const users = JSON.parse(data);
        res.json({ message: "Fetched all users", data: users });
    });
});

// POST new user
router.post("/", (req, res) => {
    const newUser = req.body;

    fs.readFile('./data/users.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ message: "Failed to read users file", error: err });

        const users = JSON.parse(data);
        users.push(newUser);

        fs.writeFile('./data/users.json', JSON.stringify(users), (err) => {
            if (err) return res.status(500).json({ message: "Failed to save user", error: err });

            res.json({ message: "User added successfully", data: users });
        });
    });
});

module.exports = router;
