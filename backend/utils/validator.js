const Joi = require('joi');

// Validation schema for bill creation
const billSchema = Joi.object({
  customer_name: Joi.string()
    .min(2)
    .max(255)
    .trim()
    .required()
    .messages({
      'string.empty': 'Customer name is required',
      'string.min': 'Customer name must be at least 2 characters'
    }),
  
  phone: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Invalid phone number (10 digits starting with 6-9)'
    }),
  
  items: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().min(1).max(255).required(),
        price: Joi.number().positive().precision(2).required()
      })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one item is required'
    }),
  
  total_amount: Joi.number()
    .positive()
    .precision(2)
    .required()
});

// Validation schema for admin login
const loginSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required'
    })
});

// Validate bill data
const validateBill = (data) => {
  const { error, value } = billSchema.validate(data, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return { valid: false, errors };
  }
  
  // Check if total matches sum of items
  const calculatedTotal = value.items.reduce((sum, item) => sum + item.price, 0);
  const roundedCalculated = Math.round(calculatedTotal * 100) / 100;
  const roundedProvided = Math.round(value.total_amount * 100) / 100;
  
  if (Math.abs(roundedCalculated - roundedProvided) > 0.01) {
    return {
      valid: false,
      errors: [`Total amount mismatch. Expected ₹${roundedCalculated}`]
    };
  }
  
  return { valid: true, data: value };
};

// Validate login credentials
const validateLogin = (data) => {
  const { error, value } = loginSchema.validate(data);
  
  if (error) {
    return { valid: false, errors: [error.details[0].message] };
  }
  
  return { valid: true, data: value };
};

module.exports = {
  validateBill,
  validateLogin
};