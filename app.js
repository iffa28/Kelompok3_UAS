const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const flash = require("req-flash");
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

const loginRoute = require("./src/routes/Route_Login");
const registerRoute = require("./src/routes/Route_Register");
const bukuRoute = require("./src/routes/Route_Buku");
const appRoute = require("./src/routes/appRoutes");

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "Kel0mP0k3",
        name: "secretName",
        cookie: {
            sameSite: true,
            maxAge: 60000,
        },
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());

app.use(function (req, res, next) {
    res.setHeader(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.setHeader("Pragma", "no-cache");
    next();
});

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/buku", bukuRoute);
app.use("/", appRoute)

console.log(app._router.stack);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
