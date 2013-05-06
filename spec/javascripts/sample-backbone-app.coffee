class Answer extends Backbone.Model
  urlRoot: "http://api.stackexchange.com/2.0/answers/"

class Answers extends Backbone.Collection
  url: "http://api.stackexchange.com/2.0/answers?site=stackoverflow"


class Comment extends Backbone.Model
  urlRoot: "http://api.stackexchange.com/2.0/comments/"

class Comments extends Backbone.Collection
  url: "http://api.stackexchange.com/2.0/comments?site=stackoverflow"


class Post extends Backbone.Model
  urlRoot: "http://api.stackexchange.com/2.0/posts/"

class Posts extends Backbone.Collection
  url: "http://api.stackexchange.com/2.0/posts?site=stackoverflow"