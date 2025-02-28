const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const expenseRoutes = require('./routes/expenseRoutes');

const path = require('path');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(bodyParser.json());
app.use('/expenses', expenseRoutes);




sequelize.sync({ force: false })
    .then(() => {
        console.log('Database connected');
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => console.log(err));