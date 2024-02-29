require("dotenv").config()
const  express = require('express');
const app = express();
const cors = require("cors")
const PORT = 3000;

require("./models/db"); // connect to the database

app.use(cors());
app.use(express.json());

//user Router
const userAuthRoutes = require("./routes/userRouter");
app.use("/userauth/api",userAuthRoutes);

//movie Router
const movieroutes = require("./routes/movieRouter");
app.use("/movies/api",movieroutes);

app.get("/", (req, res) => {
    res.status(201).json("server start")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});