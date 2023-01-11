import { IEmployee } from "./interfaces.js";

export const getEmployees = (): IEmployee[] => {
	const employees: IEmployee[] = [
		{
			firstName: "Hans"
		},
		{
			firstName: "Franz"
		}
	];
	return employees;
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