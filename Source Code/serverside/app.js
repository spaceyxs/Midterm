var express = require('express');
var app = express();
var cors = require('cors');
var dotenv = require('dotenv');
dotenv.config();

var dbConn = require('./dbConn');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
app.post('/inputData', async (request, response) => {
    try {
        var { input } = request.body;
        var db = dbConn.dbConnInstance();
        var data = await db.getProductType(input);
        response.json({ data });
    } catch (err) {
        console.log(err);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/fetchProduct', async (request, response) => {
    try {
        var { id } = request.body;
        var db = dbConn.dbConnInstance();
        var data = await db.getProduct(id);
        response.json({ data });
    } catch (err) {
        console.log(err);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
*/
app.get('/getProduct', async (request, response) => {
    try {
        var db = dbConn.dbConnInstance();
        var data = await db.getProductsCategory();
        response.json({ data });
    } catch (err) {
        console.log(err);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

var PORT = process.env.PORT || 3306; 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
