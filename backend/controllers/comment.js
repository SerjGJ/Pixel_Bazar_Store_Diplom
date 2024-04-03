const Comment = require('../models/Comment');
const Post = require('../models/Post');

// add
async function addComment(postId, comment) {
    const newComment = await Comment.create(comment);

    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } })

    await newComment.populate('author')

    return newComment;
}

// delete

async function deleteComment(postId, commentId) {
    await Comment.deleteOne({_id: commentId});
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } })
}

module.exports = {
    addComment,
    deleteComment
}