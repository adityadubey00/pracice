const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    fs.readdir('./files', function(err, files) {
        if (err) {
            console.error(err);
            res.status(500).send("Error reading files");
            return;
        }
        console.log(files);
        res.render("index", { files: files });
    });
});

app.post('/create', function(req, res) {
    const title = req.body.title.split(' ').join('_'); // Replace spaces with underscores for the filename
    const content = req.body.description; // Assuming description is the content from the textarea

    fs.writeFile(`./files/${title}.txt`, content, function(err) {
        if (err) {
            console.error(err);
            res.status(500).send("Error creating file");
            return;
        }
        res.redirect('/');
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});