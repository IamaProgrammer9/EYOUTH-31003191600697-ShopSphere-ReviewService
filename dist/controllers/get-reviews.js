import prisma from "../lib/prisma";
export const getProductReviews = async (req, res) => {
    const { productId } = req.query;
    if (!productId) {
        res.status(400).json("productId is required");
        return;
    }
    const reviews = await prisma.productReview.findMany({
        where: {
            productId: parseInt(productId),
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    res.status(200).json(reviews);
};
