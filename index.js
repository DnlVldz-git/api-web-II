const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config()

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Request-Method');

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();

});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


const PORT = process.env.PORT || 0000;
app.listen(PORT, () => {
    console.log(`Server esta ejecutandose en puerto ${PORT}.`);
});

//elimina todos los datos de las tablas y las vuelve a crear
const sync = (process.env.MA_DB_SYNC === 'true');

const db = require("./models");

db.sequelize.sync({ alter: sync }).then(() => {
    if (sync) {
        console.log("Sincronizar db");
    } else {
        console.log("No se harán cambios a la db");
    }

});

require("./routes/estudiante.routes")(app);
