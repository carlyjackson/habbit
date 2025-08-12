import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import habbitRouter from './routers/habbitRouter';
import chatRouter from './routers/chatRouter';
// import { ApolloServer } from 'apollo-server-express';
// import { typeDefs, resolvers } from './graphql'; // define these in your project
// const server = new ApolloServer({ typeDefs, resolvers });

const PORT = process.env.PORT || 3000;

const app = express();
// await server.start();
// server.applyMiddleware({ app, path: '/graphql' });
app.use(express.json()); 



app.use('/habbits', habbitRouter); 

app.use('/chat', chatRouter);



// app.listen(4000, () => {
//   console.log('Server running at http://localhost:4000/graphql');
// });


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});