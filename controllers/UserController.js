import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import UserModel from '../models/User.js'

export const register = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const Hash = await bcrypt.hash(password, salt);
    
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            tel: req.body.tel,
            passwordHash: Hash,    
        });
    
        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret1',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...UserData} = user._doc;

        res.json({
            ...UserData,
            token,
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось зареєструватись!'
        })
    };
     
}

export const login = async (req, res) =>{
    try{
        const user = await UserModel.findOne({ email: req.body.email})

        if(!user){
            return res.status(404).json({
                message: 'Авторизація невдала!'
            })
        }
    
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    
        if(!isValidPass){
            return res.status(400).json({
                message: 'Хибна пошта або пароль!',
            });
        }
        
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret1',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...UserData} = user._doc;

        res.json({
            ...UserData,
            token,
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось авторизуватись!'
        })
    }
}

export const getMe = async (req, res) => {
    try{
        const user = await UserModel.findById(req.userId);
            if(!user) {
                return res.status(404).json({
                    message: 'Користувача не знайдено!'
                });
            }

            const { passwordHash, ...UserData} = user._doc;

            res.json({
                UserData,
            });    
       

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось авторизуватись!'
        })

    }
}