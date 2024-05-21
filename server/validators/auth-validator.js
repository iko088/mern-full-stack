const { z } = require("zod");

const loginSchema = z.object({
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "email is required"})
    .min(3, {message: "Email Must be atleast 3 characters"})
    .max(255, {message: "Email shouldn't be greater then 255 characters"}),
    password: z
    .string({required_error: "Password is required"})
    .trim()
    .min(7, {message: "Password Must be atleast 7 characters"})
    .max(1000, {message: "Password shouldn't be greater then 1000 characters"}),
})

const signupSchema = loginSchema.extend({
    username: z
    .string({required_error: "name is required"})
    .trim()
    .min(3, {message: "Name Must be atleast 3 characters"})
    .max(255, {message: "Name shouldn't be greater then 255 characters"}),

    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "email is required"})
    .min(3, {message: "Email Must be atleast 3 characters"})
    .max(255, {message: "Email shouldn't be greater then 255 characters"}),

    phone: z
    .string({required_error: "Phone is required"})
    .trim()
    .min(10, {message: "Phone Must be atleast 10 cracter"})
    .max(20, {message: "Phone shouldn't be greater then 20 characters"}),

    password: z
    .string({required_error: "Password is required"})
    .trim()
    .min(7, {message: "Password Must be atleast 7 characters"})
    .max(1000, {message: "Password shouldn't be greater then 1000 characters"}),
});


module.exports = {signupSchema, loginSchema};
