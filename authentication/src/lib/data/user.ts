import prisma from "../db"

export const getUserData = async (id: number) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id
            }
        });
    } catch (error) {
        return null;
    }
}

export const getUserDataByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email
            }
        });
    } catch (error) {
        return null;
    }
}