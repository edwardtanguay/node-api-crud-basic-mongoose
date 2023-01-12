import * as model from './model.js';
import express from 'express';
import cors from 'cors';
import * as config from './config.js';
import mongoose from 'mongoose';
import { IEmployee } from './interfaces.js';

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost/northwind');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.get('/employees', async (req: express.Request, res: express.Response) => {
	try {
		const employees = (await model.getEmployees() as IEmployee[]);
		res.json(employees);
	}
	catch (e) {
		res.status(500).send(e);
	}
});

app.post('/employee', async (req: express.Request, res: express.Response) => {
	try {
		const employee: IEmployee = req.body;
		const result = await model.addEmployee(employee);
		res.status(200).send(result);
	}
	catch (e) {
		res.status(500).send(e.message);
	}
});

app.delete('/employee/:id', async (req: express.Request, res: express.Response) => {
	try {
		const id = req.params.id;
		const result = await model.deleteEmployee(id);
		res.status(200).send(result);
	}
	catch (e) {
		res.status(500).send(e);
	}
});

app.put('/employee/:id', async (req: express.Request, res: express.Response) => {
	try {
		const id = req.params.id;
		const employee: IEmployee = req.body;
		const result = await model.editEmployee(id, employee);
		res.status(200).send(result);
	}
	catch (e) {
		res.status(500).send(e);
	}
});

app.listen(config.port, () => {
	console.log(`listening on port http://localhost:${config.port}`);
});