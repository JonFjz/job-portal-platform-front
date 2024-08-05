import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to save the JSON file in the public directory
const dataFilePath = path.join(__dirname, 'public', 'courses.json');

async function fetchAndSaveCourses() {
    try {
        const response = await axios.get('https://www.udemy.com/api-2.0/courses/?page=1&page_size=10&search=vue&ratings=4', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('eBV2BXPEiOSqSCKG7psr5zCxXDn0GZ0srJ8hT42q:kXQF7TvmXakVUO0ydQPDXxfmzclfMSOXNb7Qwr3h9YJWG0D1glfrjTPdpipZ3xe61zFiZGllrYBD353sNbqqe027SLfMAY7vz8j28GogezAbtotGxjEmN6Hf8sVa6euF').toString('base64')
            }
        });

        // Save data to the public directory
        fs.writeFileSync(dataFilePath, JSON.stringify(response.data));

        console.log('Courses data saved successfully.');
    } catch (error) {
        console.error('Failed to fetch and save Udemy courses:', error);
    }
}

// Fetch and save courses
fetchAndSaveCourses();