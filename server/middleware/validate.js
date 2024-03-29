import { validationResult } from 'express-validator'

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)))
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        const err = []
        errors.array().map(error => err.push(error.msg))

        //status: 400 Bad Request
        res.status(400).json({ success: false, data: null, error: err })
    }
}

export default validate;