# Nicesly Authentication Implementation Guide

## Översikt
Den här guiden visar hur du implementerar riktig autentisering med Google, Apple, Outlook och e-post för Nicesly.

## Tech Stack Rekommendation

### Backend
- **Node.js + Express** (eller Next.js API routes)
- **Passport.js** - OAuth authentication
- **MongoDB/PostgreSQL** - Användardatabas
- **JWT** - Session management
- **Nodemailer** - För e-post verifiering

### Frontend
- **React** (din befintliga kod)
- **Axios** - HTTP requests

---

## 1. SETUP BACKEND

### Installation
```bash
npm install express passport passport-google-oauth20 passport-apple passport-microsoft jsonwebtoken bcryptjs nodemailer dotenv mongoose
```

### Projektstruktur
```
backend/
├── config/
│   ├── passport.js          # Passport strategies
│   └── db.js               # Database connection
├── models/
│   └── User.js             # User model
├── routes/
│   └── auth.js             # Auth routes
├── middleware/
│   └── auth.js             # JWT verification
├── .env                    # Environment variables
└── server.js               # Main server file
```

---

## 2. SKAPA OAUTH APPS

### Google OAuth
1. Gå till [Google Cloud Console](https://console.cloud.google.com)
2. Skapa nytt projekt "Nicesly"
3. Aktivera "Google+ API"
4. Credentials → Create OAuth 2.0 Client ID
5. Authorized redirect URIs: `https://yourdomain.com/api/auth/google/callback`
6. Spara Client ID och Client Secret

### Apple Sign In
1. Gå till [Apple Developer](https://developer.apple.com)
2. Certificates, Identifiers & Profiles → Identifiers
3. Register en ny App ID
4. Enable "Sign in with Apple"
5. Skapa Service ID
6. Konfigurera Return URLs: `https://yourdomain.com/api/auth/apple/callback`
7. Spara Service ID, Team ID, Key ID och ladda ner private key

### Microsoft/Outlook OAuth
1. Gå till [Azure Portal](https://portal.azure.com)
2. Azure Active Directory → App registrations
3. New registration "Nicesly"
4. Redirect URI: `https://yourdomain.com/api/auth/microsoft/callback`
5. Spara Application (client) ID och Client secret

---

## 3. BACKEND IMPLEMENTATION

### .env File
```env
# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://nicesly.com

# Database
MONGODB_URI=mongodb://localhost:27017/nicesly
# eller
DATABASE_URL=postgresql://user:pass@localhost:5432/nicesly

# JWT
JWT_SECRET=din-super-hemliga-nyckel-här-minst-32-tecken
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=din-google-client-id
GOOGLE_CLIENT_SECRET=din-google-client-secret
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback

# Apple OAuth
APPLE_CLIENT_ID=com.nicesly.signin
APPLE_TEAM_ID=ditt-team-id
APPLE_KEY_ID=ditt-key-id
APPLE_PRIVATE_KEY_PATH=./AuthKey_XXX.p8
APPLE_CALLBACK_URL=https://yourdomain.com/api/auth/apple/callback

# Microsoft OAuth
MICROSOFT_CLIENT_ID=din-microsoft-client-id
MICROSOFT_CLIENT_SECRET=din-microsoft-client-secret
MICROSOFT_CALLBACK_URL=https://yourdomain.com/api/auth/microsoft/callback

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@nicesly.com
SMTP_PASS=ditt-email-lösenord
```

### models/User.js
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6,
    select: false // Don't return password by default
  },
  name: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    enum: ['email', 'google', 'apple', 'microsoft'],
    default: 'email'
  },
  providerId: String,
  avatar: String,
  emailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  subscription: {
    tier: {
      type: String,
      enum: ['none', 'ai-brev', 'ai-brev-kurir', 'total-ombud'],
      default: 'none'
    },
    startDate: Date,
    loyaltyMonths: {
      type: Number,
      default: 0
    }
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### config/passport.js
```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy = require('passport-apple');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('../models/User');

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await User.findOne({ 
      $or: [
        { providerId: profile.id, provider: 'google' },
        { email: profile.emails[0].value }
      ]
    });

    if (user) {
      // Update existing user
      user.provider = 'google';
      user.providerId = profile.id;
      user.emailVerified = true;
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        provider: 'google',
        providerId: profile.id,
        avatar: profile.photos[0]?.value,
        emailVerified: true
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Apple Strategy
passport.use(new AppleStrategy({
  clientID: process.env.APPLE_CLIENT_ID,
  teamID: process.env.APPLE_TEAM_ID,
  keyID: process.env.APPLE_KEY_ID,
  privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
  callbackURL: process.env.APPLE_CALLBACK_URL,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, idToken, profile, done) => {
  try {
    const email = profile.email || idToken.email;
    const name = req.body.user ? JSON.parse(req.body.user).name : null;
    
    let user = await User.findOne({ 
      $or: [
        { providerId: profile.id, provider: 'apple' },
        { email: email }
      ]
    });

    if (user) {
      user.provider = 'apple';
      user.providerId = profile.id;
      user.emailVerified = true;
      await user.save();
    } else {
      user = await User.create({
        name: name ? `${name.firstName} ${name.lastName}` : 'Apple User',
        email: email,
        provider: 'apple',
        providerId: profile.id,
        emailVerified: true
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Microsoft Strategy
passport.use(new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: process.env.MICROSOFT_CALLBACK_URL,
  scope: ['user.read']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ 
      $or: [
        { providerId: profile.id, provider: 'microsoft' },
        { email: profile.emails[0].value }
      ]
    });

    if (user) {
      user.provider = 'microsoft';
      user.providerId = profile.id;
      user.emailVerified = true;
      await user.save();
    } else {
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        provider: 'microsoft',
        providerId: profile.id,
        emailVerified: true
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));
```

### routes/auth.js
```javascript
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// ============================================
// GOOGLE OAUTH
// ============================================

// Start Google OAuth
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  session: false 
}));

// Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  }
);

// ============================================
// APPLE OAUTH
// ============================================

router.get('/apple', passport.authenticate('apple', { session: false }));

router.post('/apple/callback',
  passport.authenticate('apple', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  }
);

// ============================================
// MICROSOFT OAUTH
// ============================================

router.get('/microsoft', passport.authenticate('microsoft', { 
  scope: ['user.read'],
  session: false 
}));

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=auth_failed`
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  }
);

// ============================================
// EMAIL/PASSWORD SIGNUP
// ============================================

router.post('/signup/email', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vänligen fyll i alla fält' 
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email redan registrerad' 
      });
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const user = await User.create({
      email,
      password,
      name,
      provider: 'email',
      verificationToken
    });

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    await transporter.sendMail({
      from: `"Nicesly" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Verifiera din e-postadress - Nicesly',
      html: `
        <h2>Välkommen till Nicesly!</h2>
        <p>Hej ${name},</p>
        <p>Klicka på länken nedan för att verifiera din e-postadress:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>Länken är giltig i 24 timmar.</p>
        <br>
        <p>Mvh,<br>Nicesly Team</p>
      `
    });

    res.status(201).json({
      success: true,
      message: 'Konto skapat! Kolla din e-post för verifiering.',
      requiresVerification: true
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Något gick fel. Försök igen.' 
    });
  }
});

// ============================================
// EMAIL VERIFICATION
// ============================================

router.get('/verify-email/:token', async (req, res) => {
  try {
    const user = await User.findOne({ 
      verificationToken: req.params.token 
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Ogiltig eller utgången verifieringslänk' 
      });
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'E-post verifierad!',
      token
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Något gick fel' 
    });
  }
});

// ============================================
// LOGIN WITH EMAIL
// ============================================

router.post('/login/email', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vänligen fyll i alla fält' 
      });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Felaktigt email eller lösenord' 
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ 
        success: false, 
        message: 'Felaktigt email eller lösenord' 
      });
    }

    // Check email verification
    if (!user.emailVerified) {
      return res.status(403).json({ 
        success: false, 
        message: 'Vänligen verifiera din e-post först',
        requiresVerification: true
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Något gick fel' 
    });
  }
});

// ============================================
// GET CURRENT USER
// ============================================

router.get('/me', async (req, res) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Inte inloggad' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Användare hittades inte' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
        subscription: user.subscription
      }
    });

  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Ogiltig token' 
    });
  }
});

module.exports = router;
```

### server.js
```javascript
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Passport config
require('./config/passport');

// Routes
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Nicesly API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

---

## 4. FRONTEND IMPLEMENTATION

### Uppdatera din React-kod

```javascript
// Lägg till i början av filen
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Uppdatera handleAuthProvider funktionen:
const handleAuthProvider = useCallback(async (provider) => {
  setIsLoading(true);
  setSelectedProvider(provider);
  
  try {
    if (provider === 'Google') {
      // Redirect till backend OAuth
      window.location.href = `${API_URL}/auth/google`;
      
    } else if (provider === 'Apple') {
      window.location.href = `${API_URL}/auth/apple`;
      
    } else if (provider === 'Outlook') {
      window.location.href = `${API_URL}/auth/microsoft`;
      
    } else if (provider === 'E-post') {
      // Visa email signup form
      setCurrentView('email-signup');
    }
  } catch (error) {
    console.error('Auth error:', error);
    alert('Ett fel uppstod. Försök igen.');
    setIsLoading(false);
    setSelectedProvider(null);
  }
}, []);
```

### Skapa Email Signup Component

```javascript
const EmailSignupView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Lösenorden matchar inte');
      return;
    }

    if (formData.password.length < 6) {
      setError('Lösenordet måste vara minst 6 tecken');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Något gick fel');
      }

      // Visa success meddelande
      alert('Konto skapat! Kolla din e-post för att verifiera ditt konto.');
      setCurrentView('home');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full my-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Skapa konto med e-post</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Namn
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
              placeholder="Ditt namn"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-post
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
              placeholder="din@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lösenord
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
              placeholder="Minst 6 tecken"
              minLength="6"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bekräfta lösenord
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition"
              placeholder="Upprepa lösenord"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Skapar konto...' : 'Skapa konto'}
          </button>
        </form>

        <button
          onClick={() => setCurrentView('generic-signin')}
          disabled={loading}
          className="w-full text-sm text-gray-500 mt-6 hover:text-cyan-600 transition"
        >
          ← Tillbaka till inloggning
        </button>
      </div>
    </div>
  );
};
```

### Success Handler (När OAuth redirectar tillbaka)

```javascript
// Skapa en ny sida: /auth/success

import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Spara token i localStorage
      localStorage.setItem('nicesly_token', token);
      
      // Redirect till dashboard
      navigate('/dashboard');
    } else {
      // Något gick fel
      navigate('/login?error=no_token');
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loggar in...</p>
      </div>
    </div>
  );
}
```

---

## 5. DEPLOYMENT

### Backend (Railway, Heroku, DigitalOcean)

**Railway (Rekommenderat)**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway init
railway up
```

### Frontend (Vercel, Netlify)

**Vercel (Rekommenderat)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables i Vercel dashboard:
REACT_APP_API_URL=https://your-backend.railway.app/api
```

---

## 6. SÄKERHET

### VIKTIGT!
- ✅ Använd HTTPS i produktion
- ✅ Sätt secure cookies
- ✅ Implementera rate limiting
- ✅ Validera all input
- ✅ Använd CORS korrekt
- ✅ Håll secrets hemliga (.env i .gitignore)
- ✅ Implementera CSRF protection
- ✅ Sanitize user input
- ✅ Använd prepared statements för databas

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'För många inloggningsförsök, försök igen senare'
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/signup', authLimiter);
```

---

## 7. TESTA

```bash
# Test Google OAuth
curl https://your-backend.railway.app/api/auth/google

# Test email signup
curl -X POST https://your-backend.railway.app/api/auth/signup/email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'

# Test getting current user
curl https://your-backend.railway.app/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 8. NÄSTA STEG

När authentication fungerar, lägg till:
1. **Password reset** funktionalitet
2. **2FA** (Two-factor authentication)
3. **Session management** (logout på alla enheter)
4. **BankID integration** för fullmakt
5. **Scrive integration** för digital signering
6. **Subscription management** (Stripe/Klarna)

---

## Sammanfattning

1. ✅ Skapa OAuth apps (Google, Apple, Microsoft)
2. ✅ Setup backend med Express + Passport
3. ✅ Implementera routes för alla providers
4. ✅ Uppdatera frontend för att redirecta till OAuth
5. ✅ Hantera callbacks och skapa JWT tokens
6. ✅ Spara token på frontend
7. ✅ Använd token för att hämta user data
8. ✅ Deploy backend och frontend
9. ✅ Testa allt!

Behöver du hjälp med något specifikt steg? 🚀
