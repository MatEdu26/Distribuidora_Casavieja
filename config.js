const {config} = require("conf.env");

const MONGO_USER = process.env.MONGO_USER;

const MONGO_PASS = process.env.MONGO_PASS;

module.exports = {MONGO_USER, MONGO_PASS}