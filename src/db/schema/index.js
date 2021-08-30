const mongoose = require('mongoose');
const { Schema } = mongoose;

export const userSchema = new Schema({
	id: String,
	name: String,
	email: String,
	phone: String,
	dob: String,
	company: String,
});

export const companySchema = new Schema({
	id: String,
	name: String,
	website: String,
	adress: String,
	employeesCount: Number,
});
