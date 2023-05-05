import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const fieldsValidator = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  return next();
};

export default fieldsValidator;
