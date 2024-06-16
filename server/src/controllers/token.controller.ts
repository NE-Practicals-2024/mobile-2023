import { Request, Response } from "express";
import ServerResponse from "../utils/ServerResponse";
import prisma from "../prisma/prisma-client";

const validateToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.params
        const purchasedToken = await prisma.purchasedToken.findUnique({
            where: {
                token
            }
        })
        if (!purchasedToken) return ServerResponse.notFound(res, "Token not found")
        const expirationDate: any = new Date(purchasedToken?.purchasedDate as Date)
        expirationDate.setDate(expirationDate.getDate() + (purchasedToken?.tokenDays as number))
        const currentDate: any = new Date();
        const remainingDays = Math.ceil((expirationDate - currentDate) / (1000 * 60 * 60 * 24));
        
        if (remainingDays < 0) {
            const info = {
                token: purchasedToken.token,
                remainingDays: 0
            }
            return ServerResponse.success(res, "Token expired", { info })
        }

        const info = {
            token: purchasedToken.token,
            remainingDays
        }
        return ServerResponse.success(res, "Token info fetched", { info })
    } catch (error) {
        return ServerResponse.error(res, "Error occured", error)
    }
}
const purchaseNewToken = async (req: Request, res: Response) => {
    try {
        const { meter, amount } = req.body
        const token = await generateToken();
        const tokenDays = amount / 100;
        if (tokenDays > 365 * 5) {
            return ServerResponse.error(res, "Token duration cannot exceed 5 years");
        }
        const purchasedToken = await prisma.purchasedToken.create({
            data: {
                meterNumber: meter,
                amount: parseInt(amount),
                tokenDays,
                token: token as string
            }
        })
        return ServerResponse.success(res, "Token purchased successfully", { purchasedToken })
    } catch (error) {
        return ServerResponse.error(res, "Error occured", error)
    }
}
const getTokensByMeterNumber = async (req: Request, res: Response) => {
    try {
        const { meter } = req.params
        const tokens = await prisma.purchasedToken.findMany({
            where: {
                meterNumber: meter
            }
        })
        return ServerResponse.success(res, "Tokens fetched succesfully", { tokens })
    } catch (error) {
        return ServerResponse.error(res, "Error occured", error)
    }
}

const generateToken = async () => {

    let token;
    let isUnique = false;

    while (!isUnique) {
        token = Math.floor(10000000 + Math.random() * 90000000).toString();
        const existingToken = await prisma.purchasedToken.findMany({
            where: {
                token: token
            }
        });

        if (existingToken.length === 0) {
            isUnique = true;
        }
    }

    return token;
}

const tokenController = {
    validateToken,
    purchaseNewToken,
    getTokensByMeterNumber
}

export default tokenController;