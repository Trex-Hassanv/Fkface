// ✅ Express API + Local Cache + Bot Command for "ThisPersonDoesNotExist"

// 📦 Server: api/fakeface (saves images locally)
const express = require("express");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const app = express();

const PORT = 3000;
const CACHE_DIR = path.join(__dirname, "cache", "fakefaces");

app.get("/fakeface", async (req, res) => {
  try {
    const filename = `face_${Date.now()}.jpg`;
    const savePath = path.join(CACHE_DIR, filename);

    await fs.ensureDir(CACHE_DIR);
    const imgRes = await axios.get("https://thispersondoesnotexist.com", {
      responseType: "arraybuffer"
    });
    await fs.writeFile(savePath, imgRes.data);

    res.sendFile(savePath);
  } catch (err) {
    console.error("❌ /fakeface error:", err.message);
    res.status(500).json({ error: "Failed to fetch face." });
  }
});

app.listen(PORT, () => console.log(`✅ FakeFace API running at http://localhost:${PORT}`));
