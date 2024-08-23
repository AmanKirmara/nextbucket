import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
                message: props => `${props.value} is not a valid email address!`
            }
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        apiKey: {
            type: String,
            unique: true
        },
        storageLimit: {
            type: Number,
            default: 10 * 1024 * 1024 // Default 10MB
        },
        storageUsed: {
            type: Number,
            default: 0
        },
        activeSession: { 
            type: String 
        },
        lastLoginIP: String,
        lastLoginDevice: String,
    },
    {
        timestamps: true,
        strict: true // Prevent saving undefined fields
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew && !this.apiKey) {
        this.apiKey = uuidv4();
    }
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    // Log the data being used in the token
    console.log("Generating Access Token with the following data:");
    console.log("_id:", this._id);
    console.log("email:", this.email);
    console.log("username:", this.username);
    console.log("fullName:", this.fullName);
    console.log("role:", this.role);
    console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
    console.log("ACCESS_TOKEN_EXPIRY:", process.env.ACCESS_TOKEN_EXPIRY);

    // Generate and return the access token
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};


userSchema.methods.generateRefreshToken = function () {
    // Log the data being used in the token
    console.log("Generating Refresh Token with the following data:");
    console.log("_id:", this._id);
    console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);
    console.log("REFRESH_TOKEN_EXPIRY:", process.env.REFRESH_TOKEN_EXPIRY);

    // Generate and return the refresh token
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};


export const User = mongoose.model("User", userSchema);
