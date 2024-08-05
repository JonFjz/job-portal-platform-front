import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/courses', async (req, res) => {
    try {
        const response = await axios.get('https://www.udemy.com/api-2.0/courses/?page=1&page_size=10&search=vue&ratings=4', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('eBV2BXPEiOSqSCKG7psr5zCxXDn0GZ0srJ8hT42q:kXQF7TvmXakVUO0ydQPDXxfmzclfMSOXNb7Qwr3h9YJWG0D1glfrjTPdpipZ3xe61zFiZGllrYBD353sNbqqe027SLfMAY7vz8j28GogezAbtotGxjEmN6Hf8sVa6euF').toString('base64')
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Udemy courses' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
