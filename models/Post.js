import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tegs: {
        type: Array,
        default: [],
    },
    tel: {
        type: String,
        default: '321',
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
{
    timestamps: true,
});

export default mongoose.model('Post', PostSchema);