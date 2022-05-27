const express=require('express');
const cors = require('cors');


const PORT = 3001;

const app=express();

app.use(cors({
    origin: '*' //set correct link
}));
app.use(express.json());

app.get('/', (req,res) => {
        res.send(`Hellooooo pe portul ${PORT}`);
    });

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const projectRoutes = require('./routes/project');

app.use('/user', userRoutes);

app.use('/category', categoryRoutes);

app.use('/project', projectRoutes);


const server=app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
});