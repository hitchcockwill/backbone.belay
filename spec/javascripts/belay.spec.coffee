describe "Belay", ->
  comments = answers = posts = null

  beforeEach ->
    comments = new Backbone.Model()

  # it "comments.subject should be Hello World", ->
  #   comments.set
  #     subject: "Hello World"
  #   expect(comments.get("subject")).toBe("Hello World")

  it "request should not be empty or undefined", ->
    request = SampleApp.newRequest()
    expect(_.isEmpty(request)).toBe(false)
    expect(request.readyState).not.toBe(4)

  it "there should be one open request", ->
    request = SampleApp.newRequest()
    requests = Backbone.Belay.spot(request, {path: "test"})

    expect(_.isEmpty(requests)).toBe(false)
    expect(_.values(requests).length).toBe(1)

  it "there should be no requests", ->
    expect(_.isEmpty(requests)).toBe(false)