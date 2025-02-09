// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// // Test API Route
// app.get("/", (req, res) => {
//   res.send("Backend is running...");
// });

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Import Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes); // 👈 Mount the route

// Test API Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
