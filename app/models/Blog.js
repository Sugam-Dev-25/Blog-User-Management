const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },

        slug:{
            type:String,
            unique:true
        },

        description:{
            type:String,
            required:true
        },

        image:{
            type:String,
            default:""
        },

        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        isDeleted:{
            type:Boolean,
            default:false
        }

    },
    {
        timestamps:true
    }
);

blogSchema.pre("save", function () {

    this.slug = slugify(this.title, {
        lower: true,
        strict: true
    });

});

module.exports = mongoose.model("Blog",blogSchema);