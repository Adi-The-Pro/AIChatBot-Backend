//Middlewares and express is done in app.js
const app = require('./app.js');

//Database Connection
const { connectToDatabase } = require('./db/connection.js');
const PORT = process.env.PORT || 5000;
connectToDatabase().then(() =>{
    app.listen(PORT,() => {
        console.log("Server Opened And Connected To Database 🙂");
    });
}).catch((err) => console.log(err));




