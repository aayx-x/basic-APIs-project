"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import Request and Response types
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('src'));
let activeProjects = [];
let finishedProjects = [];
app.get('/active-projects', (req, res) => {
    res.json(activeProjects);
});
app.get('/finished-projects', (req, res) => {
    res.json(finishedProjects);
});
app.post('/create-project', (req, res) => {
    const { projectName, description, people } = req.body;
    const project = { projectName, description, people };
    activeProjects.push(project);
    res.send('Project created successfully!');
});
app.post('/move-to-finished', (req, res) => {
    const { index } = req.body;
    const project = activeProjects.splice(index, 1)[0];
    finishedProjects.push(project);
    res.send('Project moved to finished!');
});
app.post('/move-to-active', (req, res) => {
    const { index } = req.body;
    const project = finishedProjects.splice(index, 1)[0];
    activeProjects.push(project);
    res.send('Project moved to active!');
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
