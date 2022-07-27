import express from "express";

import { getUsers, getUserBySub, createUser, sendSOS, updateUser, deleteUser } from "../controllers/users.js"

const router = express.Router()

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @access private
 */
router.post("/create", createUser)

/**
 * @api {put} /users/:sub Update user
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @access private
 */
router.put("/:sub", updateUser)

/**
 * @api {delete} /users/:sub Delete user
 * @apiName DeleteUser
 * @apiGroup Users
 */
router.delete("/:sub", deleteUser)


/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiSuccess {Object[]} users List of users
 * @access private
 */
router.get("/", getUsers)

/**
 * @api {get} /users/:sub Get user by sub
 * @apiName GetUserBySub
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiSuccess {Object} user User
 * @access private
 */
router.get("/sub/:sub", getUserBySub)

/**
 * @api {post} /users/:sub/sos Send SOS
 * @apiName SendSOS
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} sub User sub
 * @access private
 */
router.post("/:sub/sos", sendSOS)

export default router