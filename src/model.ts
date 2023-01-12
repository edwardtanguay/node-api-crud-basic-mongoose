import { IEmployee } from "./interfaces.js";
import { Employee } from './models/Employee.js';


export const getEmployees = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const employees: IEmployee[] = await Employee.find().select('firstName lastName title notes');
			if (employees.length > 0) {
				resolve(employees);
			} else {
				resolve({
					status: "error",
					message: "collection not found"
				});
			}
		}
		catch (e) {
			reject(e);
		}
	})
}

export const getApiInstructions = () => {
	return `
<style>
	body {
		background-color: #444;
		padding: 1rem;
		color: #fff;
		font-family: courier;
	}
	code {
		background-color: #333;
	}
	a {
		color: yellow;
	}
</style>
<h1>Employee Site API</h1>
<ul>
	<li><a href="employees">/employees</a> - show all employees</li>
</ul>
	`;
}