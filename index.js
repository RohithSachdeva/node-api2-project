const express = require("express");
const postsRouter = require('./data/routers/postsRouter.js')

const server = express();
server.use(express.json());

server.use('/api/posts', postsRouter)
server.listen(8000, () => console.log('Running on port 8000'));

