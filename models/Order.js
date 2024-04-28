import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },   
    communication: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
{
    timestamps: true,
});

export default mongoose.model('Order', OrderSchema);