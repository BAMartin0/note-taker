const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 3001;

const notes = []

app.use(express.static("public"));
app.use(express.json());

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
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading notes');
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

//post routes
app.post('/api/notes', (req, res) => {

    console.info(`${req.method} request received to add a note`);

    const newNote = req.body;

    //reads the db file and logs an error if there was one while reading file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading notes');
        }
    //creates notes variable from data read from read file then pushes the data of new note into the file data
    const notes = JSON.parse(data);
    notes.push(newNote);

    //rewrites the db file with updated content
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving note');
        }
        res.json(newNote);
    });
    });
});

//delete routes (id params)

// app.delete('/api/notes/:id', (req, res) => {

//     const noteId = req.params.id;

//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error reading notes');
//         };

//         let notes = JSON.parse(data);

//         const filteredNotes = [];
//         for (let i = 0; i < notes.length; i++) {
//           if (notes[i].id !== noteId) {
//             filteredNotes.push(notes[i]);
//           }
//         }
//         notes = filteredNotes;

//         fs.readFile('./db/db.json', JSON.stringify(notes), (err) => {
//             if (err) {
//               console.error(err);
//               return res.status(500).send("Error deleting note");
//             }
//             res.json(notes);
//         })
//     });

    
// });

//listen() method is responsible for listening for incoming connections on the specified port

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);