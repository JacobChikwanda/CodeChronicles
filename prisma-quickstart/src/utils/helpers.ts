import dotenv from "dotenv";
require('dotenv').config('../../.env')

const getEnv = () => process.env;

export {
    getEnv
}