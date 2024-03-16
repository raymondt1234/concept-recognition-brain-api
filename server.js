import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
    users: [
        {
            id: "123",
            name: "John",
            email: "john@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Sally",
            email: "sally@gmail.com",
            password: "bananas",
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get("/", (req, res) => {
    res.send(database);
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }

    });
    
    if (!found) {
        return res.status(400).json("user not found");
    }
});

app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if (email === database.users[0].email && password === database.users[0].password) {
        res.json("success");
    } else {
        res.status(400).json("error logging in");
    }
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    database.users.push({
        id: "125",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });

    res.json(`successfully registered ${name}`);

    console.log(database.users);
});

app.put("/image", (req, res)=> {
    const { id } = req.body;
    
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;

            return res.json(user.entries);
        }

    });
    
    if (!found) {
        return res.status(400).json("user not found");
    }
});

app.listen(3000, () => {
    console.log("app is listening on http://localhost/3000");
});
