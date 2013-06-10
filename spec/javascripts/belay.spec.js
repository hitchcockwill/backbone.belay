describe("Belay", function() {
  var answers, comments, posts;

  comments = answers = posts = null;
  beforeEach(function() {
    return comments = new Backbone.Model();
  });
  it("comments.subject should be Hello World", function() {
    comments.set({
      subject: "Hello World"
    });
    return expect(comments.get("subject")).toBe("Hello World");
  });
  it("request should not be empty or undefined", function() {
    var request;

    request = SampleApp.newRequest();
    expect(_.isEmpty(request)).toBe(false);
    return expect(request.readyState).not.toBe(4);
  });
  return it("name should be Will", function() {
    var name;

    name = "Willy";
    return expect(name).toBe("Willy");
  });
});
