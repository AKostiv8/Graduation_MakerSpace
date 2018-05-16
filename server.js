/**
 * Created by MakerSpace on 24.02.2018.
 */

const express = require('express');
const app = express();
const router = express.Router();
const config = require('./config/database');
const path = require('path');
const dashboardarea = require('./routes/dashboardarea')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
const firebase = require('firebase');


app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({ extended: false  }));
app.use(bodyParser.json());
app.use('/dashboardarea', dashboardarea);



// Provide static directory for frontend
app.use(express.static(__dirname + '/frontend/dist/'));

// Connect server to Angular 2 Index.html
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname + '/frontend/index.html'));
    // });


    app.get('/', (req, res) => {
        res.send('Works!');
});




app.listen(1111, () => {
    console.log('Port 1111 works');
});