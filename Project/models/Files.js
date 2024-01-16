import mongoose from "mongoose";
const { model, Schema } = mongoose;

const filesSchema = new Schema({
    course : {
        type : mongoose.Types.ObjectId,
        ref : 'courses',
        required : [true , 'course id is required!!']
    },
    filePath : {
        type : String,
        required : [true , 'file destination path required']
    },
    fileName : {
        type : String,
        required : [true , 'filename required']
    },
    type : {
        type: String,
        enum: { 
            values : ['BEST', 'AVERAGE', 'WORST'],
            message: '{VALUE} is not supported'
        },
        default: 'BEST'
    }
});

export const Files = model("files", filesSchema);
