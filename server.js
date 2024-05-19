const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const app = express();
const PORT = process.env.PORT || 3001;

const notes = []

app.use(express.static("public"));

//create html routes
//index route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

//notes route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

//get route
app.get('/api/notes', (req, res) => {
    res.json(db)
})

//post routes
app.post('/api/notes', (req, res) => {

    console.info(`${req.method} request received to add a note`);

    const newNote = res.body; 


    db.push(newNote); 

    return res.json(db);
})

//delete routes


//listen() method is responsible for listening for incoming connections on the specified port

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);