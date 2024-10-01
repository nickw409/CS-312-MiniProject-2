import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
   res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
    let categoryStr = "";
    try {
        if (req.body["numJokes"].length == 0) {
            throw new Error("Number of jokes not specified.");
        }

        if (req.body["Any"]) {
            if (categoryStr.length > 0) {
                categoryStr += ",";
            }
            categoryStr += "Any";
        }
        if (req.body["Misc"]) {
            if (categoryStr.length > 0) {
                categoryStr += ",";
            }
            categoryStr += "Misc";
        }
        if (req.body["Programming"]) {
            if (categoryStr.length > 0) {
                categoryStr += ",";
            }
            categoryStr += "Programming";
        }
        if (req.body["Dark"]) {
            if (categoryStr.length > 0) {
                categoryStr += ",";
            }
            categoryStr += "Dark";
        }
        if (req.body["Pun"]) {
            if (categoryStr.length > 0) {
                categoryStr += ",";
            }
            categoryStr += "Pun";
        }
        if (req.body["Spooky"]) {
            if (categoryStr.length > 0) {
                categoryStr += ",";
            }
            categoryStr += "Spooky";
        }
        if (req.body["Christmas"]) {
            if (categoryStr.length > 0) {
                categoryStr += ",";
            }
            categoryStr += "Christmas";
        }
        if (categoryStr.length == 0) {
            throw new Error("Specify a joke category.");
        }

        let standardPar = "?type=single&safe-mode&lang=en";
        let parStr = `${categoryStr}${standardPar}&amount=${req.body["numJokes"]}&contains=${req.body["contains"]}`;
        let url = `https://v2.jokeapi.dev/joke/${parStr}`;
        console.log(url);
        const response = await axios.get(url);
        res.render("index.ejs", {response: response.data});
    } catch (error) {
        console.error("Failed to make a request:", error.message);
        res.render("index.ejs", {error: error});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
 });