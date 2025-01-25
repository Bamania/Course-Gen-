// server.js
import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import router from "./auth.js";

const app = express();
const port = 5000;

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies or other credentials
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Define your JavaScript-based API endpoint
app.get('/', (req, res) => {
  try {
    // Spawn a new process to run the Python script
    let data1;
    const pythonProcess = spawn('python', ['index.py']);
    pythonProcess.stdout.on('data', (data) => {
      // Send the result as the response
      data1=data.toString();
      
    });

    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      res.send(data1);
    });

    
  } catch (error) {
    console.error('Error running code:', error);
    res.status(500).json({ success: false, error: 'Failed to execute code' });
  }
});

// Authentication Routes
app.use("/api/auth", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});