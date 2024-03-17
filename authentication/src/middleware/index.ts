import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { getEnv } from "../utils/helper";

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.cookies['token'];
        const { JWT_SECRET } = getEnv();
        
        if (token) {
            const userData = verify(token, JWT_SECRET as string);
            request.user = userData;
            next();
        } else {
            response.status(401).json({ success: false, message: "Session expired or token not found" });
        }
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return response.status(500).json({ success: false, message: "Invalid token" });
        }
        response.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export const decodeToken = (request: Request, response: Response, next: NextFunction) => {
    try {
        const { token } = request.params;
        const { JWT_SECRET } = getEnv();
        
        if (token) {
            const userData = verify(token, JWT_SECRET as string);
            request.user = userData;
            next();
        } else {
            return response.status(401).send(`<p style='color:red;'>Session expired or token not found</p>`);
        }
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return response.status(500).send(`<p style='color:red;'>Invalid token or token expired.</p>`);
        }
        return response.status(500).send(`<p style='color:red;'>Something went wrong</p>`);
    }
}