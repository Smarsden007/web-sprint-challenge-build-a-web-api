const Actions = require("./actions-model")
const express = require("express")
const router = express.Router()
const { validateActionId, validateAction } = require("./actions-middlware")

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", validateActionId, async (req, res, next) => {
    try {
        res.status(200).json(req.action)
    } catch (err) {
        next(err)
    }
})


router.post('/', validateActionId, validateAction, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

//YOR WORKING ON THIS ONE
router.put("/:id", validateActionId, validateAction, async (req, res,) => {
    const { notes, description, completed, project_id } = req.body
    
    try {
        console.log(req.params.id)
        const updatedAction = await Actions.update(req.params.id, {
            project_id: project_id,
            description: description,
            notes: notes,
            completed: completed,
            id: req.params.id
        })
        res.status(200).json(updatedAction)
    } catch (err) {
        return res.status(500).json({
            message: "error"
        })

    }
})

router.delete("/:id", validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.json(res.Action)
    } catch (err) {
        next(err)
    }
})

module.exports = router