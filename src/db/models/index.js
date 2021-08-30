const mongoose = require("mongoose");
const { userSchema, companySchema } = require("../schema");

export const User = mongoose.model("User", userSchema);
export const Company = mongoose.model("Company", companySchema);
