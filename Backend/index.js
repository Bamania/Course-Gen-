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

app.get('/', (req, res) => {
  try {
    const topic = "hard life";
    const style = "lil wayne";

    if (!topic || !style) {
      return res.status(400).json({ success: false, error: 'Missing topic or style in request body' });
    }

    let data1 = '';
    let error1 = '';

    const pythonProcess = spawn('python', ['rapSong-test-local.py', topic, style]);

    pythonProcess.stdout.on('data', (data) => {
      data1 += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error1 += data.toString();
    });

    pythonProcess.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
      if (code !== 0) {
        return res.status(500).json({ success: false, error: error1 });
      }

      res.json({ success: true, result: data1 });
    });
  } catch (error) {
    console.error('Error running code:', error);
    res.status(500).json({ success: false, error: 'Failed to execute code' });
  }
});

app.get('/title', (req, res) => {
  try {
    const topic = req.query.title;
    console.log("Topic from the frontend:", topic);

    if (!topic) {
      return res.status(400).json({ success: false, error: 'Missing topic in request query' });
    }

    let data1 = '';
    let error1 = '';

    const pythonProcess = spawn('python', ['title_generate.py', topic]);

    pythonProcess.stdout.on('data', (data) => {
      data1 += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error1 += data.toString();
    });

    pythonProcess.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
      if (code !== 0) {
        return res.status(500).json({ success: false, error: error1 });
      }
      console.log("Data Sent to Frontend",data1);
      res.json({ success: true, result: data1 });
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
