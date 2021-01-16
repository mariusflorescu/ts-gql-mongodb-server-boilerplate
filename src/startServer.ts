import { ApolloServer } from "apollo-server-express"
import * as Express from "express"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import * as Mongoose from "mongoose"

//to be deleted 
import { TestResolver } from "./services/Test/TestResolver"

export default async function startServer() {
  require("dotenv").config(__dirname + ".env")

  const schema = await buildSchema({
    resolvers: [TestResolver],
    emitSchemaFile: true,
  })

  const app = Express()
  
  //.env stuff
  const MONGODB_USER = process.env.MONGODB_USER
  const MONGODB_PASS = process.env.MONGODB_PASS
  const MONGODB_DBNAME = process.env.MONGODB_DBNAME

  //connection to mongodb
  Mongoose.connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@Cluster0.rd7mo.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

  )
    .then((res) => {
      console.log("DB connected succesfully")

      //create new instance of apolloserver
      const server = new ApolloServer({
        schema,
        context: () => ({}),
      })

      server.applyMiddleware({ app })

      const PORT = process.env.PORT

      app.listen(PORT, () => {
        console.log(`Listening on PORT:${PORT}`)
      })

    })

    .catch(err => {
      console.error(err)
    })
}