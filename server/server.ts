import express from 'express';
import habbitRouter from './routers/habbitRouter';
const app = express();
app.use(express.json()); // Import the habbitRouter

const PORT = process.env.PORT || 3000;

app.use('/habbits', habbitRouter); 
// include middleware controller to handle the request to the SQL DB 


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});