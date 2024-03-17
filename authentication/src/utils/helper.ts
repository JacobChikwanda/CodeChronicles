import jwt, { verify } from 'jsonwebtoken';
require('dotenv').config('../../.env');


export const getEnv = () => process.env;

// Create Token
const { JWT_SECRET, SERVER_HOST } = getEnv();

export const generateToken = (payload: any, expiresIn?:string) => {
    const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: expiresIn || '10m' });
    return token;
}

// Check whether app is online online
export const isAppOnline = async () => {
    const response = await fetch(SERVER_HOST as string);
    
    if (response.ok) {
        return {status: true, url: SERVER_HOST};
    }

    return { status: false };
}