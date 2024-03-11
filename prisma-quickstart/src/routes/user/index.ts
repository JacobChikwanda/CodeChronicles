import express from "express";
import prisma from "../../lib/db";
const userRouter = express.Router();

interface userProps {
    email: string,
    name: string,
    title: string,
    content?: string
}

userRouter.post('/', async (req, res) => {
    try {
        const data: userProps = req.body;
        await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                posts: {
                    create: {
                        title: data.title,
                        content: data.content
                    }
                }
            }
        });
    
        res.status(200).json({ success: true, message: "User created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "User could not be created." });
    }
})

userRouter.get("/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const data = await prisma.user.findMany({
            where: {
                email
            },
            include: {
                posts: true,
            }
        });
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error })
    }
})

export default userRouter