import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


import userRoutes from './routes/users.js';
import { log } from './utils/logger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);


// Replace your DB connect log with:
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => log("✅ MongoDB Connected"))
  .catch(err => log("❌ MongoDB Connection Error", err));

// After app.listen:
log(`🚀 Trailblix Server Running on http://localhost:${PORT}`);

app.listen(PORT, () => {
  log(`🚀 Trailblix Server Running on http://localhost:${PORT}`);
});