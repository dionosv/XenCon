const express = require('express')
const app = express()
const port = 22

app.get('/', (req, res) => {
  res.send('XenHack')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})