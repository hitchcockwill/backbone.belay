describe "Belay", ->
  comments = answers = posts = null

  beforeEach ->
    comments = new Comments()
    answers = new Answers()
    Posts = new Posts()

  it "should add three requests to the queue", ->
    math = 1+1



    expect(math).toEqual(2)

  it "name should be Will", ->
    name = "Will"
    expect(name).toEqual("Will")