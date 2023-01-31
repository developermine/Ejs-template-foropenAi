const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const aiRoutes = require('./Routes/aiRoutes');






const app = express();
app.set('view engine', 'ejs');


//middleware...
app.use(express.static('public'))
app.use(express.static('public/javaScript'))
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //middleware use for post request



app.use('/', aiRoutes);




app.listen(4000, console.log('server running on http://localhost:4000'));