import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


import checkAuth from './utils/checkAuth.js';

import { loginValidation, postCreateValidation, registerValidation, orderCreateValidation } from './validations/valiadstions.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js'; 
import * as OrderController from './controllers/OrderController.js';

mongoose
    .connect('mongodb+srv://mamba:2LCsKzqjHmFNDJLB@cluster0.ta4zajx.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.listen(3003, (err) => {
    if(err){
        return console.log(err)
    };

    console.log('Server: '+ 3003 +' OK');
});

app.use(express.json());
app.use(cors());


app.get('/' ,(req, res) => {    
    res.send('Hello expres')
});

app.post('/auth/reg', registerValidation, UserController.register);

app.post('/auth/log', loginValidation,  UserController.login);

app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);


app.get('/order', OrderController.getAll);
app.get('/order/:id', OrderController.getOne);

app.post('/order', checkAuth, orderCreateValidation,  OrderController.create);
app.get('/userOrders/:email', OrderController.getUserOrders);


app.delete('/order/:id', checkAuth, OrderController.remove);
app.patch('/order/:id', checkAuth, OrderController.update);