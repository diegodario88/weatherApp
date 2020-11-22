const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('mongoose');
const routes = require('./routes/router');

const PORT = 8080;
const DB_URL = 'mongodb://devuser:devpass@mongodb/weather'
const app = express();
const DB_CONFIG = { useNewUrlParser: true, useUnifiedTopology: true, }

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.listen(PORT, () => console.log(`Api Running at port:...${PORT}`));
mongo.connect(DB_URL, DB_CONFIG, () => console.log('Mongodb connected!'));