// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/proxy-document', async (req, res) => {
  try {
    const url = req.query.url;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.send(response.data);
  } catch (error) {
    console.error('Error proxying document:', error);
    res.status(500).send('Error fetching document');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));