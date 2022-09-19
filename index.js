const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

// connection to database
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongodb failed", err);
});
//middleware routes
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(helmet());
app.use(compression());
app.use(cors());

//routes 
app.use("/post" , postRoutes);
app.use("/auth" , authRoutes);


//connection to the server
const Port = process.env.PORT;
app.listen(Port, () => {
  console.log("server connected");
});
