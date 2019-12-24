const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../backend/schema/schema')
const prisma  = require('./generated/prisma-client')
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
      con.query(`INSERT INTO products.users (email,name,password,role) VALUES('${fields.email}', '${fields.name}', '${hashedPass}','user')`, function (error, result, fields) {
        if (error) throw error;
        console.log(result)
        res.json(result);
      });
    })
  } catch{
    // res.redirect('register');
  }
});
app.listen(port, err => {
  async function main() {
    // Create a new user called `Alice`
    const newUser = await prisma.createUser({ name: 'Alice' })
    console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)

    // Read all users from the database and print them to the console
    const allUsers = await prisma.users()
    console.log(allUsers)
  }

  main().catch(e => console.error(e))
  err ? console.log(err) : console.log("Server");
})