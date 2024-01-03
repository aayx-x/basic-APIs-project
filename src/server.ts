import express, { Request, Response } from 'express'; // Import Request and Response types
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));

let activeProjects: any[] = [];
let finishedProjects: any[] = [];

app.get('/active-projects', (req: Request, res: Response) => {
  res.json(activeProjects);
});

app.get('/finished-projects', (req: Request, res: Response) => {
  res.json(finishedProjects);
});

app.post('/create-project', (req: Request, res: Response) => {
  const { projectName, description, people } = req.body;
  const project = { projectName, description, people };

  activeProjects.push(project);
  res.send('Project created successfully!');
});

app.post('/move-to-finished', (req: Request, res: Response) => {
  const { index } = req.body;
  const project = activeProjects.splice(index, 1)[0];
  finishedProjects.push(project);
  res.send('Project moved to finished!');
});

app.post('/move-to-active', (req: Request, res: Response) => {
    const { index } = req.body;
    const project = finishedProjects.splice(index, 1)[0];
    activeProjects.push(project);
    res.send('Project moved to active!');
  });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
