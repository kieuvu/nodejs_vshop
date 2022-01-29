const Post = require("../../models/post.model");

class PostController {
  index(req, res, next) {
    res.render('user/pages/post');
  }

  async getPost(req, res, next) {
    let limit = 0;
    const filter = {};
    if (req.query.id) {
      filter._id = req.query.id;
    }
    if (req.query.limit) {
      limit = +req.query.limit;
    }
    await Post.find(filter).sort({ updatedAt: -1 }).limit(limit)
      .then((data) => {
        res.json(data);
      });
  }

  postDetail(req, res, next) {
    res.render('user/pages/postDetail');
  }
}

module.exports = new PostController;