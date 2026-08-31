import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { getUserFromRequest } from "../utils/auth";

export const writeProductReview = async (req: Request, res: Response) => {
    const { productId, rating, comment, accessToken } = req.body;
    const user = await getUserFromRequest(req, accessToken);
    if (!user) {
        res.status(401).send('Not authenticated');
        return;
    }
    const userId = user.id;

    // Check if the user already wrote a review about the product
    const existingReview = await prisma.productReview.findUnique({
        where: {
            userId_productId: {
                userId: userId,
                productId: productId,
            },
        },
    });

    if (existingReview) {
        res.status(400).json("Review already exists");
        return;
    }
    
    // Create a new review
    const newReview = await prisma.productReview.create({
        data: {
            userId: userId,
            productId: productId,
            rating: rating,
            comment: comment,
            userName: user.name,
        },
    });

    res.status(200).json('Review created successfully');
};