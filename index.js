const sequelize = require('./config/connection');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./controllers'));

sequelize.sync({ force: true }).then(() => app.listen(PORT, () => console.log(`Blog App listening on port ${PORT}`)));