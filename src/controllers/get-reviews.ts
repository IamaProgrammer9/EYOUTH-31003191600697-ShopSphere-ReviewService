import prisma from "../lib/prisma";
import { Request, Response } from "express";

export const getProductReviews = async (req: Request, res: Response) => {
    const { productId } = req.query;

    if (!productId) {
        res.status(400).json("productId is required");
        return;
    }

    const reviews = await prisma.productReview.findMany({
        where: {
            productId: parseInt(productId as string),
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    res.status(200).json(reviews);
};
