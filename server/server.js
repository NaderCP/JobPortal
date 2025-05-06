import express from 'express'
import cors from 'cors'
import dbConnect from './config/mongoose.config.js'
import dotenv from 'dotenv'
import router from './routes/store.route.js'


const app = express();

app.use(express.json(), cors());

dotenv.config();
const PORT = process.env.PORT;
dbConnect();
app.use('/api', router);
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    err.name = "Not Found";
    next(err);
});
app.use((err, req, res, next) => {
    console.log(err.statusCode);
    err.name === "ValidationError" ? err.statusCode = 400 : "";
    // Normalize the error
    const normalizedError = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong',
        name: err.name || 'Server Error',
        validationErrors: extractValidationErrors(err),
    };
    // Return the normalized error
    res.status(normalizedError.statusCode).json(normalizedError);
});
function extractValidationErrors(err) {
    const validationErrors = {};
    if (err.name === 'ValidationError') {
        for (const field in err.errors) {
            console.log(field);
            if (err.errors.hasOwnProperty(field)) {
                const errorMessage = err.errors[field].message;
                validationErrors[field] = errorMessage;
            }
        }
    }
    return validationErrors;
}
app.listen(PORT, ()=>
console.log(`listen to port : ${PORT}`))