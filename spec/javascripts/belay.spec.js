describe("Belay", function() {
  var answers, comments, posts;

  comments = answers = posts = null;
  beforeEach(function() {
    var Posts;

    comments = new Comments();
    answers = new Answers();
    return Posts = new Posts();
  });
  it("should add three requests to the queue", function() {
    var math;

    math = 1 + 1;
    return expect(math).toEqual(2);
  });
  return it("name should be Will", function() {
    var name;

    name = "Will";
    return expect(name).toEqual("Will");
  });
});
