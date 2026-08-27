"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductReviews = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getProductReviews = async (req, res) => {
    const { productId } = req.query;
    if (!productId) {
        res.status(400).json("productId is required");
        return;
    }
    const reviews = await prisma_1.default.productReview.findMany({
        where: {
            productId: parseInt(productId),
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    res.status(200).json(reviews);
};
exports.getProductReviews = getProductReviews;
