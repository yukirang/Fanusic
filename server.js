const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('API Running'));

//serve static
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));