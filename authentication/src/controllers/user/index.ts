import { Request, Response } from "express";
import { hash, compare } from "bcryptjs";
import prisma from "../../lib/db";
import { getUserData, getUserDataByEmail } from "../../lib/data/user";
import { generateToken } from "../../utils/helper";
import { sendConfirmationEmail, sendEmail } from "../../utils/mail";

interface userDataProps {
    name: string,
    password: string,
    email: string
}

export const signUp = async (request: Request, response: Response) => {
    try {
        const data: userDataProps = request.body;
        
        // Validate
        if (!data.email && !data.name && !data.password) {
            return response.status(404).json({ success: false, message: "Invalid sign up details" });
        }

        // Check existing record
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (existingUser) {
            return response.status(403).json({ success: false, message: "User with given email already exists" });
        }

        data.password = await hash(data.password, 10);

        // Create user
        const user = await prisma.user.create({
            data: data
        });

        const payload = {
            id: user.id,
            name: user.name
        };

        // Check if account is verified
        if (!user.confirmed) {
            const { data } = await sendConfirmationEmail(user, payload);

            if (data) {
                return response.status(202).json({ success: false, message: "User created successfully. Email sent. Verify your account." });
            }
            
            return response.status(401).json({ success: false, message: "Something went wrong. Could not sign you up. Try again." });
        }

    } catch (error) {
        console.error(error);
        return response.status(500).json({ success: false, message: "Something went wrong." })
    }
}

export const getUser = async (request: Request, response: Response) => {
    try {
        const { id } = request.user;
        const user = await getUserData(id);
        
        if (!user) {
            return response.status(404).json({ success: false, message: "No user found." });
        }

        return response.status(200).json({ success: true, user });
    } catch (error) {
        return response.status(500).json({ success: false, message: "Something went wrong." });
    }

}

export const updateUser = async (request: Request, response: Response) => {
    try {
        const { newPassword } = request.body;
        const { id } = request.user;
        const existingUser = await getUserData(id);

        if (!existingUser) {
            return response.status(404).json({ success: false, message: "User does not exist" });
        }

        const hashedPassword = await hash(newPassword, 10);

        await prisma.user.update({
            data: {
                password: hashedPassword
            },
            where: {
                id
            }
        });

        return response.status(200).json({ success: true, message: "User updated" })
    } catch (error) {
        return response.status(500).json({ success: false, message: "Something went wrong.", error });
    }
}

export const deleteUser = async (request: Request, response: Response) => {
    try {
        const { id } = request.user;
        const user = await getUserData(id);

        if (!user) {
            return response.status(404).json({ success: false, message: "User does not exist." });
        }

        await prisma.user.delete({
            where: {
                id: user.id
            }
        });

        return response.status(200).json({ success: true, message: "User deleted." });
    } catch (error) {
        return response.status(500).json({ success: false, message: "Something went wrong." });
    }
}

export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        const user = await getUserDataByEmail(email);

        if (!user) {
            return response.status(404).json({ success: false, message: "User doesn't exist" });
        }

        // Compare password
        if (! await compare(password, user.password)) {
            return response.status(403).json({ success: false, message: "Incorrect password" });
        }

        const payload = {
            id: user.id,
            name: user.name
        };

        // Check if account is verified
        if (!user.confirmed) {
            const { data } = await sendConfirmationEmail(user, payload);

            if (data) {
                return response.status(202).json({ success: false, message: "Account not verified. Email sent." });
            }
            
            return response.status(401).json({ success: false, message: "Something went wrong. Account not verified. Try again." });
        }
        
        const token = generateToken(payload);

        return response
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000
        })
        .json({ success: true, message: "Login successful." });

    } catch (error) {
        return response.status(500).json({ success: false, message: "Something went wrong" });
    }
}