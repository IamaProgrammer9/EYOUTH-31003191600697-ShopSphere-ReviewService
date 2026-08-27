"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeProductReview = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../utils/auth");
const writeProductReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    const user = await (0, auth_1.getUserFromRequest)(req);
    if (!user) {
        res.status(401).send('Not authenticated');
        return;
    }
    const userId = user.id;
    // Check if the user already wrote a review about the product
    const existingReview = await prisma_1.default.productReview.findUnique({
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
    const newReview = await prisma_1.default.productReview.create({
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
exports.writeProductReview = writeProductReview;
