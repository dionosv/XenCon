const express = require('express')
const app = express()
const port = 8888

app.get('/', (req, res) => {
  res.send('XenHack')
  console.log('ok')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})