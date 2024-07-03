import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
var articles = [{title : "placeholder", text : "placeholder"}];

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({"extended" : true}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.render("index.ejs", {"articles" : articles, "article" : {title : "", text: ""}});
});

app.get("/read/:article", (req, res) => {
    res.render("index.ejs", {"articles" : articles, "index" : req.params.article, "article" : articles[req.params.article]});
})

app.get("/edit", (req, res) => {
    res.render("edit.ejs");
});

app.get("/edit/:article", (req, res) => {
    res.render("edit.ejs", {"article" : req.params.article});
});

app.post("/submit/:article", (req, res) => {
    if (req.params.article == -1) {
        articles.push({"title" : req.body["title"], "text" : req.body["article"]});
    } else {
        articles[req.params.article] = {"title" : req.body["title"], "text" : req.body["article"]};
    }
    res.redirect("/");
});

app.get("/edit/:article/delete", (req, res) => {
    articles.splice(req.params.article, 1);
    res.redirect("/");
});