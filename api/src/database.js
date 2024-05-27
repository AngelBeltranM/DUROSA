const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db', {
})
.then(db => console.log('base de datos conectada'))
.catch(err => console.log(err));

