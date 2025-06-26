import { Router } from "express"
import { getAllNotes, getNoteById, postNote, updateNote, deleteNote } from "../controllers/notesController.js"

import { basicAuth } from "../middleware/authMiddleware.js"

const router = Router()

router.use(basicAuth)

router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", postNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router