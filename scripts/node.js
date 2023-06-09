const http = require('http')
const fs = require('fs')
const { Console } = require('console')
const port = 5500

const server = http.createServer(function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.readFile('/htmls/index.html', function(error, data){
    if(error){
      res.writeHead(404)
      res.write(error)
    } else {
      res.write(data)
    }
    res.end()
  })
})

server.listen(port, function(error){
  if(error){
    console.log('Something went wrong', error)
  } else {
    console.log('Server is listening on port', port)
  }
})
