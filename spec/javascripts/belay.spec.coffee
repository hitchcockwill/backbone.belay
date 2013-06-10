describe "Belay", ->
  comments = answers = posts = null

  beforeEach ->
    comments = new Backbone.Model()

  it "comments.subject should be Hello World", ->
    comments.set
      subject: "Hello World"
    expect(comments.get("subject")).toBe("Hello World")

  it "request should not be empty or undefined", ->
    request = SampleApp.newRequest()
    expect(_.isEmpty(request)).toBe(false)
    expect(request.readyState).not.toBe(4)

  it "name should be Will", ->
    name = "Willy"
    expect(name).toBe("Willy")