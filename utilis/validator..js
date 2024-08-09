const {check,validationResult} = require("express-validator");

exports.signupValidator = [
  check("name").trim().notEmpty().withMessage("Name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email id"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min:6, max:20 })
    .withMessage("Password should be 8-20 characters long"),
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email id"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min:6, max:20 })
    .withMessage("Password should be 8-20 characters long"),
];

exports.chatCompletionValidator = [
  check("message")
  .notEmpty()
  .withMessage("Message is required"),
];
exports.validate = (req,res,next)=>{
    const error = validationResult(req).array();
    if(error.length){
      return res.status(422).json({errors:error[0]});
    }
    next();
};