import express from "express";
import prisma from "../../lib/db";
const postRouter = express.Router();

interface postProps {
    title: string,
    content: string
}

postRouter.post('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const postData: postProps = req.body;
        
        // Get the user
        const existingUser = await prisma.user.findUnique({ where: { email } });
        
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        await prisma.post.create({
            data: {
                title: postData.title,
                content: postData.content,
                author: {
                    connect: { id: existingUser.id }
                }
            }
        })

        return res.status(200).json({ success: false, message: "Post created" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Post not created", error });
    }
})

export default postRouter