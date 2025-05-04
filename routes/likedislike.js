function likedislikeRouter(app){
    app.post("/posts/:postId/like",function(req,res){
        res.json({
            message:"Liked a post"
        })
    })
    app.post("/posts/postId/dislike",function(req,res){
        res.json({
            message:"Dislike a post"
        })
    })
}
module.exports={
    likedislikeRouter:likedislikeRouter
}