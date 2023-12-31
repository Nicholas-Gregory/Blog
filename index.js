const sequelize = require('./config/connection');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const helpers = require('./utils/helpers')

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 86400000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    })
};

app.use(session(sess));

app.use(require('./controllers'));

sequelize.sync({ force: true }).then(() => app.listen(PORT, () => console.log(`Blog App listening on port ${PORT}`)));