const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Multer setup (store file in memory for demo)
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Upload + Encrypt route
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    // For demo, just pretend we "encrypt" it
    const summary = "Quantum computing uses qubits instead of bits. It helps in cryptography and optimization.";

    res.json({
      message: `✅ File "${req.file.originalname}" Encrypted with Quantum Key!`,
      summary
    });
  } catch (error) {
    console.error("Error in /upload:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ AI Q&A route
app.post("/question", (req, res) => {
  const { question } = req.body;
  let answer = "";

  if (question.toLowerCase().includes("quantum")) {
    answer = "Quantum is the branch of physics that studies subatomic particles and their behavior.";
  } else if (question.toLowerCase().includes("computing")) {
    answer = "Computing is the process of using computers to process information and solve problems.";
  } else {
    answer = "This is a demo answer for your hackathon project.";
  }

  res.json({ answer });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
