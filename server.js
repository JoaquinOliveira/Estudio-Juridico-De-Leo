const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.get('api/proxy-document', async (req, res) => {
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

// Sirve los archivos estáticos de la build de React
app.use(express.static(path.join(__dirname, 'build')));

// Maneja las solicitudes a través de index.html de React
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor Express ejecutándose en el puerto ${PORT}`));