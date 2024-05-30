const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5173;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST request to save form data
app.post('/save', (req, res) => {
    const data = req.body;

fs.readFile('materias-primas.json', 'utf8', (err, fileData) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }

    let jsonData = [];
    if (fileData) {
        jsonData = JSON.parse(fileData);
    }

    jsonData.push(data);

    fs.writeFile('materias-primas.json', JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }

    res.status(200).send('Data saved successfully');
    });
});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
