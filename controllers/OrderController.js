import OrderModel from '../models/Order.js';
import User from '../models/User.js';

export const update = async (req, res) => {
    try{
        const orderId = req.params.id;

        await OrderModel.updateOne(
            {
                _id: orderId,
            },
            {
                fullName: req.body.fullName,
                communication: req.body.communication,
                description: req.body.description,
                user: req.userId,                
            },
        );
        res.json({
            massage: "допис оновлено!",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось оновити допис!',           
        })
    }
};

export const getOne = async (req, res) =>{
    try{
        const orderId = req.params.id;

        const doc = await OrderModel.findOne({_id: orderId});

        if (!doc) {
            return res.status(404).json({ message: 'Допис не знайден' });
        }

        res.json(doc);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати допис!',           
        })
    }
}

export const remove = async (req, res) =>{
    try{
        const orderId = req.params.id;

        const doc = await OrderModel.deleteOne({_id: orderId});

        res.json({
            message: "Успішно видалено"
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось видалити допис!',           
        })
    }
}

export const getUserOrders = async (req, res) =>{
    try{
        
        const userEmail = req.params.email;
        console.log(userEmail);
        const user = await User.find({email: userEmail})
        console.log(user);
        console.log(user[0]._id);

        const order = await OrderModel.find({user:user[0]._id}).populate('user').exec();
        console.log(order);
        
        res.json(order);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати дописи!',
           
        })
    }
}

export const getAll = async (req, res) =>{
    try{
        const order = await OrderModel.find().populate('user').exec();

        res.json(order);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати дописи!',
           
        })
    }
}


export const create = async (req, res) => {
    try{
        const doc = new OrderModel({
            fullName: req.body.fullName,
            communication: req.body.communication,
            description: req.body.description,
            user: req.userId,
        })


        const order = await doc.save();

        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось створити замовлення! Заповніть всі поля!'            
        })
    }
}
