import {body} from 'express-validator';
export const expensevalidator=[
    body("title")
    .notEmpty()
    .withMessage("titiel required "),
    

]