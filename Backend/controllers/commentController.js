const Product = require('../models/productModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const AsyncHandler = require('express-async-handler');

const addCommentsToProduct = AsyncHandler(async (req, res) => {
    const id = req.userId;

    const commenter = await User.findById(id).exec();

    if (!commenter) {
        return res.status(401).json({
            message: "User Not Found"
        });
    }
    const  slug  = req.params.slug;

    // console.log(`the slug is ${slug}`)
    const product = await Product.findOne({slug}).exec();

    if (!product) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }

    const body  = req.body.comment;

    // res.json(body);

    const newComment = await Comment.create({
        body: body,
        author: commenter._id,
        Product: Product._id
    });

    await product.addComment(newComment._id);

    return res.status(200).json({
        comment: await newComment.toCommentResponse(commenter)
    })

});

const getCommentsFromProduct = AsyncHandler(async (req, res) => {
    const  slug  = req.params.slug;

    const product = await Product.findOne({slug}).exec();

    // res.json(product);
    if (!product) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }

    const loggedin = req.loggedin;

    if (loggedin) {
        const userId = req.userId;
        const loginUser = await User.findById(userId).exec();
        return await res.status(200).json({
            comments: await Promise.all(product.comments.map(async commentId => {
                const commentObj = await Comment.findById(commentId).exec();
                return await commentObj.toCommentResponse(loginUser);
            }))
        })
    } else {
        return await res.status(200).json({
            comments: await Promise.all(product.comments.map(async (commentId) => {
                const commentObj = await Comment.findById(commentId).exec();
                // console.log(commentObj);
                const temp =  await commentObj.toCommentResponse(false);
                // console.log(temp);
                return temp;
            }))
        })
    }
});

const deleteComment = AsyncHandler(async (req, res) => {
    const userId = req.userId;

    const commenter = await User.findById(userId).exec();

    if (!commenter) {
        return res.status(401).json({
            message: "User Not Found"
        });
    }
    const { slug, id } = req.params;

    const product = await Product.findOne({slug}).exec();

    if (!product) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }

    const comment = await Comment.findById(id).exec();

    // console.log(`comment author id: ${comment.author}`);
    // console.log(`commenter id: ${commenter._id}`)

    if (comment.author.toString() === commenter._id.toString()) {
        await product.removeComment(comment._id);
        await Comment.deleteOne({ _id: comment._id });
        return res.status(200).json({
            message: "comment has been successfully deleted!!!"
        });
    } else {
        return res.status(403).json({
            error: "only the author of the comment can delete the comment"
        })
    }
});

module.exports = {
    addCommentsToProduct,
    getCommentsFromProduct,
    deleteComment
}