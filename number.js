const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 9876;

let numbersWindow = [];
const windowSize = 10;

// Function to fetch numbers from a third-party server
const fetchNumbers = async (type) => {
    const response = await fetch(`http://20.244.56.144/test/numbers/${type}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Failed to fetch numbers');
    }
};

// Function to calculate the average of numbers in the window
const calculateAverage = (numbers) => {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
};

// Route to handle requests for different number types
app.get('/numbers/:type', async (req, res) => {
    const type = req.params.type;
    const validTypes = ['p', 'f', 'e', 'r'];

    if (!validTypes.includes(type)) {
        return res.status(400).send({ error: "Invalid type" });
    }

    try {
        const newNumbers = await fetchNumbers(type);

        const uniqueNumbers = [...new Set([...numbersWindow, ...newNumbers])];

        // Update the window state
        numbersWindow = uniqueNumbers.slice(-windowSize);

        const avg = calculateAverage(numbersWindow);

        res.json({
            windowPrevState: numbersWindow.slice(0, -newNumbers.length),
            windowCurState: numbersWindow,
            numbers: newNumbers,
            avg: avg.toFixed(2)
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Average Calculator microservice running on port ${port}`);
});
