const mongoose  = require('mongoose');

const uri = process.env.DATABASE_URL;

mongoose.connect(uri, (err) => {
    if(err)
        console.log('error connect to database')
    else
        console.log('connect successfully to database')
});
