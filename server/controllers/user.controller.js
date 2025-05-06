  import User from '../models/user.model.js'; 
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
 

const userController = {
  registerUser: (req, res, next) => { // Added next for potential error handling middleware
    User.create(req.body)
      .then(user => {
          // Avoid sending the password back, even hashed
          // Consider creating a user object without the password or using .select('-password') in a find query if needed
          res.status(201).json({ msg: "success!", userId: user._id, email: user.email }); // Use 201 for created
      })
      .catch(err => {
          // Pass the error to the next middleware (e.g., your global error handler)          // Or handle specific errors here and send appropriate status codes
         res.status(400).json(err); // Keep sending 400 for validation errors for now
         // next(err); // Alternative: Use if you have a global error handler
      });
  },

  loginUser: (req, res, next) => {
    // Login logic will go here (find user, compare password, create token)
    res.status(501).json({ message: "Login endpoint not implemented yet." });  },

  logoutUser: (req, res, next) => {
    // Logout logic will go here (e.g., clear cookie)
    res.status(501).json({ message: "Logout endpoint not implemented yet." });
  },

  getLoggedInUser: (req, res, next) => {
    // Logic to get user details (likely from token payload after authentication middleware)
    res.status(501).json({ message: "Get logged-in user endpoint not implemented yet." });
  }
 };
 

export default userController;
