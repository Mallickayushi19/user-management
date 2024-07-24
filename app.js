const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// EJS view engine
app.set('view engine', 'ejs');

// Sample user data
const users = [
    { userName: "Aditya Gupta", userEmail: "aditya@gmail.com", userAge: "22", userUniqueId: '1' },
    { userName: "Vanshita Jaiswal", userEmail: "vanshita@gmail.com", userAge: "21", userUniqueId: '2' },
    { userName: "Sachin Yadav", userEmail: "sachin@gmail.com", userAge: "22", userUniqueId: '3' }
];

// Routes
app.get("/", (req, res) => {
    res.render("home", { data: users });
});

app.post("/", (req, res) => {
    const { userName, userEmail, userAge, userUniqueId } = req.body;
    users.push({ userName, userEmail, userAge, userUniqueId });
    res.redirect("/");
});

app.post('/delete', (req, res) => {
    const { userUniqueId } = req.body;
    const index = users.findIndex(user => user.userUniqueId === userUniqueId);
    if (index !== -1) {
        users.splice(index, 1);
    }
    res.redirect("/");
});

app.post('/update', (req, res) => {
    const { userName, userEmail, userAge, userUniqueId } = req.body;
    const user = users.find(user => user.userUniqueId === userUniqueId);
    if (user) {
        user.userName = userName;
        user.userEmail = userEmail;
        user.userAge = userAge;
    }
    res.redirect("/");
});

// Start the server
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});
