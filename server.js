const express = require('express');

const app = express();

const messages = [];

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});