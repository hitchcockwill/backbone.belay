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
  it("there should be one open request", function() {
    var request, requests;

    request = SampleApp.newRequest();
    requests = Backbone.Belay.spot(request);
    console.info("reqeusts: ", _.keys(requests, _.values(requests)));
    expect(_.isEmpty(requests)).toBe(false);
    return expect(_.values(requests).length).toBe(1);
  });
  return it("name should be Will", function() {
    var name;

    name = "Willy";
    return expect(name).toBe("Willy");
  });
});
