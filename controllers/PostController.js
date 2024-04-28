import PostModel from '../models/Post.js';

export const update = async (req, res) => {
    try{
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
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
        const postId = req.params.id;

        const doc = await PostModel.findOne({_id: postId});

        if (!doc) {
            return res.status(404).json({ message: 'Допис не найден' });
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
        const postId = req.params.id;

        const doc = await PostModel.deleteOne({_id: postId});

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

export const getAll = async (req, res) =>{
    try{
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати дописи!',
           
        })
    }
}

export const create = async (req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось створити допис!',
           
        })
    }
}