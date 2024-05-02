
import { body } from 'express-validator';
import UserModel from '../models/User.js';


export const loginValidation = [
    body('email', 'Некоректний формат електронної адреси!')
    .isEmail()
    .optional()
    .custom(async (value, { req, res }) => {
        const existingUser = await UserModel.findOne({ email: value });
        if (!existingUser) {
            throw new Error('Користувача не знайдено!');
        }
        return true;
    }),
    //body('email', 'Некоректний формат пошти!').isEmail(),
    body('password', 'Пароль мінімум 4 символи!').isLength({ min: 4}),
    
];



export const registerValidation = [
    body('email', 'Некоректний формат електронної адреси!')
    .isEmail()
    .optional()
    .custom(async (value, { req, res }) => {
        const existingUser = await UserModel.findOne({ email: value });
        if (existingUser) {
            throw new Error('Ця електронна адреса вже використовується!');
        }
        return true;
    }),
    body('password', 'Пароль мінімум 4 символи!').isLength({ min: 4}),
    body('fullName', 'Логін мінімум 2 символи!').isLength({ min: 2}),
    body('avatarUrl', 'Некоректне посилання, спробуйте інше!').optional().isURL(),
    body('tel', 'Некоректний номер телефону!')
    .optional()
    .custom((value) => {
        const containsLetters = /[a-zA-Zа-яА-Я]/.test(value);
        const isValidLength = value.length >= 7;
        if (containsLetters) {
            throw new Error('Номер не може містити букви!');
        }
        if (!isValidLength) {
            throw new Error('Некоректний номер телефону!');
        }
        return true;
    }),
];

export const postCreateValidation = [
   
    body('title', 'Введіть заголовок!').isLength({ min: 2}).isString(),
    body('text', 'Введіть текст!').isLength({ min: 5}).isString(),
    body('tags', 'Некоректні теги!').isLength({ min: 2}).isArray(),
    body('avatarUrl', 'Некоректне посилання, спробуйте інше!').optional().isURL(),
    
];

export const orderCreateValidation = [   
    body('fullName', 'Введіть як до вас звертатись!').isLength({ min: 2}).isString(),
    body('communication', 'Введіть як з вами звязатись!').isLength({ min: 5}),
    body('description', 'Опишіть своє замовлення(що?, звідки?, куди? ...)!').isLength({ min: 5}).isString(),    
];