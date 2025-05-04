 function commentsRouter(app){
    app.post("/posts/:postId/comments",function(req,res){
        res.json({
           message:"Add a comments to a post"
        })
    })
    app.get("/posts/:postId/comments",function(req,res){
        res.json({
            message:"Get comments for a post"
        })
    })
    app.delete("/posts/:postId/comments",function(req,res){
        res.json({
            message:"Delete a comment "
        })
    })
}
module.exports={
    commentsRouter:commentsRouter
}