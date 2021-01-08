/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const upload = (filename, contentStream) =>
    axios.post('http://localhost:3000', contentStream, {
        headers: {
            'Content-Type': 'application/octet-stream',
            'X-Filename': filename,
        },
    });
