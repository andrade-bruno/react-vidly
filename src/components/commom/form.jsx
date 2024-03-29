import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);

		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		// If errorMessage is truphy
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		// The new state always have to be an Object, can't be a null value (this happens if valite() returns null)
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	renderButtonSubmit(label) {
		return (
			<button
				type='submit'
				className='btn btn-primary'
				// style={{ display: "block", margin: "auto" }}
				disabled={this.validate()}>
				{label}
			</button>
		);
	}

	renderInput(name, label, type = "text") {
		const { data, errors } = this.state;

		return (
			<Input
				type={type}
				label={label}
				name={name}
				value={data[name]}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}

	renderSelect(name, label, options) {
		const { data, errors } = this.state;
		return (
			<Select
				options={options}
				label={label}
				name={name}
				value={data[name]}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}
}

export default Form;
