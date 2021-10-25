require('dotenv').config();
const { PORT = 3001, DATABASE_URL } = process.env;
const express = require('express');
const morgan =require('morgan');
const mongoose= require('mongoose');
const app = express();
const cors = require('cors');



mongoose.connect(DATABASE_URL);
//MongoDB Listeners
const db = mongoose.connection;
    db.on('open', () => console.log('You are connected to MongoDB'))
    db.on('close', () => console.log('You are disconnected from MongoDB'))
    db.on('error', () => console.log('error'));

//Model
const Schema = mongoose.Schema;
const PeopleSchema = new Schema({
    name: String,
    image: String,
    title: String,
});
const People = new mongoose.model('People', PeopleSchema);


//Mount Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


//Test Route
app.get('/', (req, res) => {
    res.send('hola pendejo')
});

//!!!!!!!!Routes!!!!!!!!\\

//Index Route
app.get('/people', async (req, res) => {
    try {
        res.json(await People.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

//Delete Route
app.delete('/people/:id', async (req, res) => {
    try {
        res.json(await People.findByAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error);
    }
});

//Update Route
app.put('/people/:id', async (req, res) => {
    try {
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
        )
    } catch (error) {
        res.status(400).json(error);
    }
});

//Create Route
app.post('/people', async (req,res) => {
    try {
        res.json(await People.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});










app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

