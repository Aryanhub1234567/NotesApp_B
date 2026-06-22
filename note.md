app.post('/notes', async (req, res) => {

  const data = req.body
  await NoteModel.create({
    title: data.title,
    description: data.description,

  })

  //console.log(req.body)
  res.status(201).json({
    message: "note created successfully"
  })

})

/* GET /Notes */
app.get('/notes', async (req, res) => {

  const notes = await NoteModel.find()

  res.status(200).json({
    message: "note fetched successfully",
    notes: notes //returns array
  })

})

/* delete /notes/id */
app.delete('/notes/:id', async (req, res) => {

  const id = req.params.id

  await NoteModel.findOneAndDelete({
    _id: id
  })

  res.status(200).json({
    message: "note deleted successfully",
  })

})

app.patch('/notes/:id', async (req, res) => {

  const id = req.params.id
  const description = req.body.description

  await NoteModel.findOneAndUpdate(
    { _id: id },
    { description: description }
  )

  res.status(200).json({
    message: "note updated successfully",
  })


})
