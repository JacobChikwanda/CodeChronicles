import { Request, Response } from "express";
import { getPostsData } from "../../lib/data/post";

export const getPosts = async (request: Request, response: Response) => {
    try {
        return response.json({ data: getPostsData(), user: request.user });
    } catch (error) {
        return response.status(500).json({ success: false, message: "Something went wrong" })
    }
}