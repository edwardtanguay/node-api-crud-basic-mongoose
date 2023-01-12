import { IEmployee } from "./interfaces.js";
import { Employee } from './models/Employee.js';


export const getEmployees = async () => {
	return new Promise<IEmployee[] | {}>(async (resolve, reject) => {
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

export const addEmployee = async (employeeData: IEmployee) => {
	return new Promise(async (resolve, reject) => {
		try {
			const employee = new Employee(employeeData);
			const addedEmployee = await employee.save();
			resolve({
				status: "success",
				newId: addedEmployee._id
			});
		}
		catch (e) {
			reject(e);
		}
	});
}

export const deleteEmployee = async (id: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const employee = await Employee.find({ id });
			const result = await Employee.deleteOne({ _id: id });
			if (result.deletedCount === 1) {
				resolve({
					status: "success",
					message: `item with id "${id}" was deleted`
				})
			} else {
				reject({
					status: "error",
					message: `item with id "${id}" was not deleted`
				});
			}
		}
		catch (e) {
			reject(e);
		}
	});
}

export const editEmployee = async (id: string, employee: IEmployee) => {
	return new Promise(async (resolve, reject) => {
		try {
			const oldEmployee = await Employee.find({ _id: id });
			await Employee.updateOne({ _id: id }, { $set: { ...employee } });
			const newEmployee = await Employee.find({ _id: id });
			if (Array.isArray(oldEmployee) && oldEmployee.length === 0) {
				reject({
					status: "error",
					message: `employee with id "${id}" not found`
				});
			} else {
				resolve({
					status: 'success',
					oldEmployee,
					newEmployee
				})
			}
		}
		catch (e) {
			if (e.name === 'CastError') {
				reject({
					status: "error",
					message: e.message
				})
			} else {
				reject(e);
			}
		}
	});
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