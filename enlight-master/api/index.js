const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/aiesec-carthage?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Models
const candidatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  university: { type: String, required: true },
  age: { type: Number, required: true },
  level: { type: String, required: true },
  motivation: { type: String, required: true },
  freeSpace: { type: String, required: true },
  device: {
    type: { type: String },
    userAgent: { type: String },
    timestamp: { type: String }
  },
  date: { type: Date, default: Date.now }
});

const Candidature = mongoose.model('Candidature', candidatureSchema);

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);

// Create default admin if not exists
async function createDefaultAdmin() {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
      const admin = new Admin({
        username: 'admin',
        password: hashedPassword
      });
      await admin.save();
      console.log('✅ Default admin created');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
}

// Routes

// POST /api/submit - Submit candidature
app.post('/api/submit', async (req, res) => {
  try {
    const { name, email, phone, university, age, level, motivation, freeSpace, device } = req.body;
    
    // Validation
    if (!name || !email || !phone || !university || !age || !level || !motivation || !freeSpace) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tous les champs sont requis' 
      });
    }

    // Create new candidature
    const candidature = new Candidature({
      name,
      email,
      phone,
      university,
      age: parseInt(age),
      level,
      motivation,
      freeSpace,
      device: device || {}
    });

    await candidature.save();

    res.status(201).json({
      success: true,
      message: 'Candidature enregistrée avec succès',
      data: {
        id: candidature._id,
        name: candidature.name,
        email: candidature.email,
        date: candidature.date
      }
    });

  } catch (error) {
    console.error('❌ Error submitting candidature:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'enregistrement'
    });
  }
});

// POST /api/login - Admin login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nom d\'utilisateur et mot de passe requis'
      });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides'
      });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Connexion réussie',
      token
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la connexion'
    });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token d\'accès requis'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }
};

// GET /api/candidatures - Get all candidatures (protected)
app.get('/api/candidatures', verifyToken, async (req, res) => {
  try {
    const candidatures = await Candidature.find()
      .sort({ date: -1 })
      .limit(1000); // Limit to 1000 most recent

    res.json({
      success: true,
      count: candidatures.length,
      data: candidatures
    });

  } catch (error) {
    console.error('❌ Error fetching candidatures:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des candidatures'
    });
  }
});

// GET /api/stats - Get statistics (protected)
app.get('/api/stats', verifyToken, async (req, res) => {
  try {
    const total = await Candidature.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Candidature.countDocuments({ date: { $gte: today } });
    
    const mobileCount = await Candidature.countDocuments({ 'device.type': 'mobile' });
    const desktopCount = await Candidature.countDocuments({ 'device.type': 'desktop' });

    res.json({
      success: true,
      data: {
        total,
        today: todayCount,
        mobile: mobileCount,
        desktop: desktopCount
      }
    });

  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des statistiques'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  createDefaultAdmin();
});

module.exports = app;
