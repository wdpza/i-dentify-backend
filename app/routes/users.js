import express from "express";

import { getUsers, getUserBySub, createUser, sendSOS } from "../controllers/users.js"

const router = express.Router()

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiSuccess {Object[]} users List of users
 */
router.get("/", getUsers);

/**
 * @api {get} /users/:sub Get user by sub
 * @apiName GetUserBySub
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiSuccess {Object} user User
 */
router.get("/sub/:sub", getUserBySub);

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 */
router.post("/create", createUser);

/**
 * @api {post} /users/:sub/sos Send SOS
 * @apiName SendSOS
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} sub User sub
 */
router.post("/:sub/sos", sendSOS);

export default router;