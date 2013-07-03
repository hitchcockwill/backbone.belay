describe("Belay", function() {
  var answers, comments, posts;

  comments = answers = posts = null;
  beforeEach(function() {
    return comments = new Backbone.Model();
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
    requests = Backbone.Belay.spot(request, {
      path: "test"
    });
    expect(_.isEmpty(requests)).toBe(false);
    return expect(_.values(requests).length).toBe(1);
  });
  return it("there should be no requests", function() {
    return expect(_.isEmpty(requests)).toBe(false);
  });
});
