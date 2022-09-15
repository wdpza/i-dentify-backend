import express from "express"

import { createSOSContact, deleteSOSContact, getSOSContacts, getSOSContactsBySub } from "../controllers/soscontacts.js"

const router = express.Router()

/**
 * @api {post} /sos/create Create sosContact
 * @apiName createSosContact
 * @apiGroup SosContact
 * @apiVersion 1.0.0
 * @access private
 */
 router.post("/create", createSOSContact)

/**
 * @api {post} /sos/delete Delete sosContact
 * @apiName deleteSosContacts
 * @apiGroup SosContact
 * @apiVersion 1.0.0
 * @access private
 */
 router.delete("/:_id", deleteSOSContact)

/**
 * Get all SOS contacts
 */
 router.get('/', getSOSContacts)

 /**
  * Get SOS Contacts by Sub
  */
 router.get('/sub/:sub', getSOSContactsBySub)

export default router