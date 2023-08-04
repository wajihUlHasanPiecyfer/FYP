const Author = require("../models/author.js")

exports.createAuthor=async(req,res)=>{
    const author = await Author.create(req.body)
    res.status(200).json({
        success:true,
        author
    })

}