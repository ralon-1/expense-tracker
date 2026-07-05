import express from "express";
import cors from "cors";
import db from'./config/db.js'
import authRoutes from "./routes/authRoutes.js";
import expenRoutes from './routes/expenseRoutes.js'
import dashboardRoutes from "./routes/dashboardRoutes.js";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expense",expenRoutes);
app.use("/api/dashboard", dashboardRoutes);



app.get("/", (req, res) => {
    console.log(' / is hitted')
  res.send("Expense Tracker API");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});