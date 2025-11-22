import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import skillGapRouter from './routes/skillgap.route.js';
import roadmapRouter from './routes/roadmap.route.js';
import getNewsRouter from './routes/getnews.route.js'; 
import cors from "cors";
const app=express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;


// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/getskill_gap', skillGapRouter);

app.use('/api/getroadmap', roadmapRouter);

app.use('/api/getnews', getNewsRouter);



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  app.get('', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
  });
};

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});

