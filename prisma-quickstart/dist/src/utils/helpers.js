"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
require('dotenv').config('../../.env');
const getEnv = () => process.env;
exports.getEnv = getEnv;
