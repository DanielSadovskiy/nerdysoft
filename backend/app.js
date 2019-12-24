const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../backend/schema/schema')
const bcrypt = require('bcrypt')
const formidable = require('formidable')
const { prisma } = require('./generated/prisma-client')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb+srv://admin:adimiron1@cluster0-1ecvy.mongodb.net/nerdysoft?retryWrites=true&w=majority', { useNewUrlParser: true })
const port = 3000;
const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log("connection error ", err));
dbConnection.on('open', () => console.log("Open"));

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  context: { prisma },
}));

app.post('/register', async function (req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      const hashedPass = await bcrypt.hash(fields.password, 10)
      const newUser = await prisma.createUser({
        name: fields.name,
        email: fields.email,
        password: hashedPass,
      })
      return newUser;
    })
  } catch(e){
    console.log(e);
  }
});
app.listen(port, err => {
  err ? console.log(err) : console.log("Server");
})