const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/habbits', (req, res) => {
    const requestBody = req.body;
    console.log("received data:", requestBody);
    return res.status(200).json({message: "habbit created!"});
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});