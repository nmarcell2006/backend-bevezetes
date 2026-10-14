const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

const array = [] //Top Level Code
router.post('/sendmessage', (request, response) => {
    const body = request.body;
    const sender = body.sender;
    const message = body.message;

    array.push({
        sender: sender,
        message: message
    });
    console.log(array);
    response.status(200).json({
        message: 'Üzenet fogadva.',
    });
});


//2. Feladat
const array1 = [];
router.post('/saveData', (request, response) => {
    array1.push(
        { 
            key: request.body.value
        }
    )
    response.status(200).json({
        message: 'Sikeres mentés',
    });
}



//* router.get => ez hoz létre  egy GET végpontot
//* Első paraméter: Az útvonalat határozza meg
//* Második paraméter: A callback függvény => request, response
//? Request => Az érkező kérés tartalma 
//? Response => Az általunk adott válasz
//* router.get('brunokiraly', (request, response) => {})
router.get('brunoKiraly', (request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'Bruno Király'
    });
});

//* Paraméter kezelése 
router.get('/pokay/:valami/:valami2', (request, response) => {
    const valami = request.params.valami; //* A paraméter mindig a kettőspont utáni rész lesz
    const valami2 = request.params.valami2;

    response.status(200).json({
        valami: valami,
        valami2: valami2,
    });
});


//* POST végpont létrehozása
router.post('/data', (request, response) => {
    const data = request.body; //* A request.body tartalmazza a küldött POST adatok törzsét
    console.log(data);

    response.status(200).json({
        receivedData: data
    });
});


module.exports = router;
