import express from 'express'
const app= express();
import routes from './router/dataRoutes.js';

import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const PORT=5050;


app.use(express.json());
app.use("/data", routes);

const config=initializeApp({
  apiKey: "AIzaSyBKATWrJxqcKe5oy1Vh9Q0P5eQZy7CUQcg",
  authDomain: "fir-91d10.firebaseapp.com",
  databaseURL: "https://fir-91d10-default-rtdb.firebaseio.com",
  projectId: "fir-91d10",
  storageBucket: "fir-91d10.appspot.com",
  messagingSenderId: "1076602368699",
  appId: "1:1076602368699:web:3612b2796a532d5ebb6f9e",
  measurementId: "G-X8QBM73VQS"
});

const database=getDatabase(config);

app.listen(PORT, ()=>{
  console.log('server is running')
})



