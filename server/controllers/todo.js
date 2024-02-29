import mongoose from "mongoose";
import Todo from "../models/todo.js";

export const addTodo = async (req, res) => {
  const todo = req.body;
  const newTodo = new Todo({
    ...todo,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  console.log(newTodo);
  try {
    await newTodo.save();
    res.status(201).json({
      message: "Notes Added Successfully",
      newTodo,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getTodoList = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await Todo.countDocuments({});
    const todo = await Todo.find().limit(limit).skip(startIndex);
    res.status(200).json({
      data: todo,
      currentPage: Number(page),
      totalTodos: total,
      numberOfPages: Math.ceil(total / limit),
    });

    // const todo = await Todo.find().populate("creator");
    // res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getSingleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUsersTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.find({ creator: id });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ messgae: "Fetched Users Todo Successfully", todo });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    await todo.deleteOne();
    res.status(200).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedTodoData = {
      title,
      description,
      creator,
      imageFile,
      tags,
      _id: id,
    };
    const todo = await Todo.findByIdAndUpdate(id, updatedTodoData, {
      new: true,
    });
    res.status(200).json({ message: "Todo Deleted Successfully", todo });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getTodoBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i"); //i=> case insensitive
    const todos = await Todo.find({ title });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getTodoByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const todos = await Todo.find({ tags: { $in: tag } });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getRelatedTodos = async (req, res) => {
  const tags = req.body;

  try {
    const todos = await Todo.find({ tags: { $in: tags } });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const likeTodo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) return res.json({ message: "User is not authenticated" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User not found" });
    }

    const todo = await Todo.findById(id);
    const index = todo.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      todo.likes.push(req.userId);
    } else {
      todo.likes = todo.likes.filter((id) => id !== String(req.userId));
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
