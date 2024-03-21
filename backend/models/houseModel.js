import mongoose from "mongoose";


const houseSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },   
      author: {
        type: String,
        required: true,
      },  
      publishYear: {
        type: Number,
        required: true,
      },  
      img: {
        type: String,
        required: false,
      }, 
    },
    {
        timestamps: true
    }
)


export const House = mongoose.model('House', houseSchema);