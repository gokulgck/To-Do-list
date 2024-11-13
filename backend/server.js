/*   
//using express
const express = require('express');
//create instance of express
const app = express();
//Define route
app.get('/', (req,res)=>{res.send("Hello Parama")});
//Start the server
const port = 3000;
app.listen(port,()=>(console.log("Server is listening "+port)))
-----------------------------------------------------------------------------------*/

/* ----------------------------------------------------------
//using express
const express = require('express');
//create instance of express
const app = express();
//middle ware
app.use(express.json());
//sample in_memory
let todos=[];
//Create new todo items
app.post('/todos', (req,res)=>{
    const {title,description} = req.body;
    const newTodo = {
        id:todos.length+1,
        title:title+""+todos.length,
        description
    };
    todos.push(newTodo);
    console.log(todos);
    res.status(201).json(newTodo);

})

// Get all todo items (GET)
app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

//Start the server
const port = 4000;
app.listen(port,()=>(console.log("Server is listening "+port)));
// ----------------------------------------------------------------------------*/

//using expres
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
//create instance of express
const app = express();

app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-app')
.then(() => console.log(' MongoDB is Connected successfully..'))
.catch((err) => console.error('Could not connect to MongoDB...', err));
// Define Todo schema and model
const todoSchema = new mongoose.Schema({
    title: String,
    description: String
});

const todoModel = mongoose.model('AllTodo', todoSchema);

//middle ware
app.use(express.json());
//sample in_memory
//      let todos=[];

// Create new todo items (POST)
app.post('/todos', async (req, res) => {
    const { title, description } = req.body;

    try {
        // const savedTodo = await newTodo.save();
        const newTodo= new todoModel({title, description});
        await newTodo.save();
        res.status(201).json(newTodo);
        console.log(newTodo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }})

// Get all todo items (GET)
app.get('/todos', async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.status(200).json(todos);
        console.log(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
});
// Update todo item (PUT or PATCH)
app.put('/todos/:id', async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;

    try {
        const updatedTodo = await todoModel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true } // options to return the updated document and run schema validators
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(updatedTodo);
        console.log(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete todo item (DELETE)
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await todoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(204).json({ message: 'Todo deleted successfully' });
        console.log(deletedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



//Start the server
const port = 4000;
app.listen(port,()=>(console.log("Server is listening "+port))); 