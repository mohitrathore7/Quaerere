const axios = require('axios')

const content = async (documentIds) => {
    const url = 'https://api.metaphor.systems/contents';
    const headers = {
        'Accept': 'application/json',
        'x-api-key': process.env.API_KEY
    };

    if (!Array.isArray(documentIds) || documentIds.length === 0) {
        throw new Error('Document IDs must be provided as an array.');
    }
    const queryParams = documentIds.map((id) => `ids=${id}`).join('&');

    try {
        const response = await axios.get(`${url}?${queryParams}`, { headers });
        return response.data
    } catch (error) {
        console.error('Axios Error:', error);
    }
};


exports.fetchContent = async (req, res) => {
    const request_body = req.body.id
    console.log(request_body)
    const arr = []
    arr.push(request_body)
    try {
        const data = await content(arr)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}