const { startSession } = require("../../models/post.model");
const Post = require("../../models/post.model");

class PostController {
  //[GET]
  index(req, res, next) {
    res.render('admin/pages/post', { layout: 'admin' });
  }

  //[GET]
  create(req, res, next) {
    res.render('admin/pages/createPost', { layout: 'admin' });
  }

  //[POST]
  async add(req, res, next) {
    const stt = {
      err: false
    };
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: res.locals.currentUser.username
    });
    await post.save()
      .then(() => {
        res.json(stt);
      });
  }

  //[GET]
  async getAll(req, res, next) {
    let filter = {};
    if (req.query.id) {
      filter._id = req.query.id;
    }
    if (req.query.search) {
      if ((req.query.search).length > 0) {
        filter.title = new RegExp(req.query.search, 'i');
      }
    }
    const data = await Post.find(filter).sort({ updatedAt: -1 });
    res.json(data);
  }

  //[GET]
  edit(req, res, next) {
    res.render('admin/pages/editPost', { layout: 'admin' });
  }

  //[POST]
  async update(req, res, next) {
    const stt = {
      err: false
    };

    await Post.findByIdAndUpdate(
      { _id: req.body.id },
      {
        "$set": {
          title: req.body.title,
          content: req.body.content
        }
      }
    ).then(() => {
      res.json(stt);
    });

  }

  //[DELETE]
  async delete(req, res, next) {
    const stt = {
      err: false
    };
    await Post.findByIdAndDelete({ _id: req.body.id });
    res.json(stt);
  }
}

module.exports = new PostController;