const Action = require('./actions-model')

async function validateActionId(req, res, next){
    try{
        const action = await Action.get(req.params.id)
        if(!action){
            res.status(404).json({message: 'No actions were found with that ID'})
        } else{
            req.action = action
            next()
        }
    }catch(err){
        res.status(400).json({message: 'an error occured, action not found'})
    }
}

const validateAction = async (req, res, next) => {
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
      next({
        status: 400,
        message: "missing required field",
      });
    } else {
      next();
    }
  };


module.exports = {validateActionId, validateAction}
