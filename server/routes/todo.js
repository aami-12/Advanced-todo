import express from 'express'
import {  addTodo, deleteTodo, getRelatedTodos, getSingleTodo, getTodoBySearch, getTodoByTag, getTodoList, getUsersTodo, likeTodo, updateTodo } from "../controllers/todo.js";
import Auth from '../Middlewares/auth.js';

const router = express.Router()

router.post('/add-todo',Auth, addTodo)
router.get('/get-todos', getTodoList)
router.get('/get-todo/:id', getSingleTodo)
router.get('/get-todos/search', getTodoBySearch) 
router.get('/tags/:tag', getTodoByTag) 
router.post('/relatedTodos', getRelatedTodos) 



router.get('/get-userstodo/:id',Auth, getUsersTodo) 
router.patch('/get-userstodo/:id',Auth, updateTodo)  
router.delete('/get-userstodo/:id',Auth, deleteTodo)    
router.patch('/like/:id',Auth, likeTodo)    
 
export default router