import { Request, Response } from "express";
import CBoard from "../models/Community/CBoard";
import CPost from "../models/Community/CPost";
import CComment from "../models/Community/CComment";

// 추가 구현
export const getPost = async (req: Request, res: Response) => {
  try {
    const search_object: {
      board?: number;
      author?: string;
      postId?: string;
    } = {};
    if (req.query.board) {
      search_object.board = Number(req.query.board);
    }
    if (req.query.author) {
      search_object.author = req.query.author as string;
    }
    if (req.query.postId) {
      search_object.postId = req.query.postId as string;
    }

    const posts = req.query.page ? await CPost.find(search_object).sort({createdAt : -1}).skip(10 * (Number(req.query.page) - 1)).limit(10) : await CPost.find(search_object);

    return res.status(200).json(posts);
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const postPost = async (req: Request, res: Response) => {
  try {
    const { boardId, title, contents } = req.body;
    if (req.params.userType !== "Student") {
      return res.status(400).json({
        errorMsg: 'UserType is not "Student"',
      });
    }

    const existBoard = await CBoard.exists({ code: boardId });
    if (!existBoard) {
      return res.status(400).json({
        errorMsg: "Invalid boardId",
      });
    }

    await CPost.create({
      writer: req.params.id,
      boardId,
      title,
      contents,
    });

    return res.status(200).json();
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const putPost = async (req: Request, res: Response) => {
  const postId = req.params?.postId;
  if (!postId) {
    return res.status(400).json({
      errorMsg: "No postId in path",
    });
  }

  const post = await CPost.findById(postId);
  if (!post) {
    return res.status(400).json({
      errorMsg: "Invalid postId",
    });
  }

  if (String(post.writer) !== req.params.id) {
    return res.status(400).json({
      errorMsg: "User is not author",
    });
  }

  if (req.body?.contents) {
    post.contents = req.body.contents;
  }
  if (req.body?.title) {
    post.title = req.body.title;
  }

  await post.save();

  return res.status(200).json();
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params?.postId;
  if (!postId) {
    return res.status(400).json({
      errorMsg: "No postId in path",
    });
  }

  const post = await CPost.findById(postId);
  if (!post) {
    return res.status(400).json({
      errorMsg: "Invalid postId",
    });
  }
  if (String(post.writer) !== req.params.id) {
    return res.status(400).json({
      errorMsg: "User is not author",
    });
  }

  await CPost.findByIdAndDelete(postId);
  return res.status(200).json();
};

export const getComment = async (req: Request, res: Response) => {
  const postId = req.params?.postId;
  if (!postId) {
    return res.status(400).json({
      errorMsg: "No postId in path",
    });
  }
  const post = await CPost.findById(postId);
  if (!post) {
    return res.status(400).json({
      errorMsg: "Invalid postId",
    });
  }
  const comments = req.query.page ? await CComment.find({postId}).skip(10 * (Number(req.query.page) - 1)).limit(10) : await CComment.find({ postId }); 
  return res.status(200).json(comments);
};

export const postComment = async (req: Request, res: Response) => {
  const postId = req.params?.postId;
  if (!postId) {
    return res.status(400).json({
      errorMsg: "No postId in path",
    });
  }
  const post = await CPost.findById(postId);
  if (!post) {
    return res.status(400).json({
      errorMsg: "Invalid postId",
    });
  }

  await CComment.create({
    writer: req.params.id,
    originId: req.body?.origin,
    postId,
    contents: req.body.contents,
  });

  return res.status(200).json();
};

export const putComment = async (req: Request, res: Response) => {
  const commentId = req.params?.commentId;
  if (!commentId) {
    return res.status(400).json({
      errorMsg: "No commentId in path",
    });
  }
  const comment = await CComment.findById(commentId);
  if (!comment) {
    return res.status(400).json({
      errorMsg: "Invalid commentId",
    });
  }

  if (String(comment.writer) !== req.params.id) {
    return res.status(400).json({
      errorMsg: "User is not author",
    });
  }

  if (req.body?.contents) {
    comment.contents = req.body.contents;
  }

  await comment.save();

  return res.status(200).json();
};

export const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params?.commentId;
  if (!commentId) {
    return res.status(400).json({
      errorMsg: "No commentId in path",
    });
  }
  const comment = await CComment.findById(commentId);
  if (!comment) {
    return res.status(400).json({
      errorMsg: "Invalid commentId",
    });
  }

  if (String(comment.writer) !== req.params.id) {
    return res.status(400).json({
      errorMsg: "User is not author",
    });
  }

  await CComment.findByIdAndDelete(commentId);
  return res.status(200).json();
};

export const getMessage = async (req: Request, res: Response) => {};
