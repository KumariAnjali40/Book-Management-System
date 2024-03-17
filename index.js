const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { bookRouter } = require("./routes/book.routes");

const { graphqlHTTP } = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const resolvers = require("./resolvers");

// Read GraphQL schema from file
const schemaString = readFileSync(
  join(__dirname, "schema", "schema.graphql"),
  "utf8"
);
const schema = makeExecutableSchema({ typeDefs: schemaString, resolvers });

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/book", bookRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});
app.use("*", (req, res) => {
  res.status(404).json({ msg: "OOps! page does not exist" });
});

app.listen(4500, async () => {
  try {
    await connection;
    console.log("Connected to Db");
    console.log("server is running at port 4500");
  } catch (err) {
    console.log(err);
  }
});
