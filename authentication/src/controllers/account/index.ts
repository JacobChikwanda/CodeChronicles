import { Request, Response } from "express";
import prisma from "../../lib/db";

export const verifyAccount = async (request: Request, response: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: request.user.id
            }
        });

        if (!user) {
            return response.status(401).send(`<h4 style='color:red'>Invalid account.</h4>`);
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                confirmed: true
            }
        });

        return response.status(200).send(`<div><h1>🥳 Congratulations</h1><p>Your account has been verified</p></div>`);
    } catch (error) {
        response.status(500).send("<h1>Something went wrong</h1>");
    }
}