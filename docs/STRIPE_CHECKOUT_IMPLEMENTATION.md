# Stripe Checkout Implementation Guide för Nicesly

## Översikt
Den här guiden visar hur du implementerar Stripe Checkout för Niceslys tre prisplaner.

## Stripe Product IDs
```
AI-Brev:           prod_THSNuBtTi4dd8d  (49 kr/mån)
AI-Brev + Kurir:   prod_THSWpxmkl07VMr  (99 kr/mån)
Total AI-Ombud:    prod_THSZuwWHLIDa4B  (119 kr/mån)
```

---

## Backend Implementation (Node.js + Express)

### 1. Installation
```bash
npm install stripe express cors dotenv
```

### 2. Environment Variables (.env)
```env
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
FRONTEND_URL=https://nicesly.com
SUCCESS_URL=https://nicesly.com/success
CANCEL_URL=https://nicesly.com/tier-selection
```

### 3. Backend API Route (server.js eller routes/checkout.js)

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Create Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { productId, userId, userEmail } = req.body;

    // Validate product ID
    const validProductIds = [
      'prod_THSNuBtTi4dd8d',  // AI-Brev
      'prod_THSWpxmkl07VMr',  // AI-Brev + Kurir
      'prod_THSZuwWHLIDa4B'   // Total AI-Ombud
    ];

    if (!validProductIds.includes(productId)) {
      return res.status(400).json({ 
        error: 'Invalid product ID' 
      });
    }

    // Get the price ID for the product
    // You need to retrieve the price ID from Stripe
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      limit: 1
    });

    if (prices.data.length === 0) {
      return res.status(400).json({ 
        error: 'No active price found for product' 
      });
    }

    const priceId = prices.data[0].id;

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL,
      customer_email: userEmail,
      client_reference_id: userId,
      metadata: {
        userId: userId,
        productId: productId
      },
      subscription_data: {
        metadata: {
          userId: userId,
          productId: productId
        }
      },
      // Automatically create customer
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    res.json({ 
      checkoutUrl: session.url,
      sessionId: session.id 
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ 
      error: error.message 
    });
  }
});

// Webhook endpoint for Stripe events
app.post('/api/stripe-webhook', 
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout completed:', session);
        
        // 1. Get user ID from metadata
        const userId = session.metadata.userId;
        const productId = session.metadata.productId;
        
        // 2. Update user in database
        // await updateUserSubscription(userId, productId, session.subscription);
        
        // 3. Send confirmation email
        // await sendConfirmationEmail(session.customer_email);
        
        break;

      case 'customer.subscription.updated':
        const subscription = event.data.object;
        console.log('Subscription updated:', subscription);
        
        // Handle subscription updates (e.g., plan changes)
        break;

      case 'customer.subscription.deleted':
        const canceledSub = event.data.object;
        console.log('Subscription canceled:', canceledSub);
        
        // Handle subscription cancellation
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('Payment succeeded:', invoice);
        
        // Handle successful payment
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log('Payment failed:', failedInvoice);
        
        // Handle failed payment (send email, etc.)
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Frontend Integration

### Uppdatera handleTierSelect i React:

```javascript
const handleTierSelect = async (tier) => {
  setSelectedTier(tier.name);
  setRedirecting(true);

  try {
    // Get user info (from auth context, localStorage, etc.)
    const userId = localStorage.getItem('nicesly_user_id');
    const userEmail = localStorage.getItem('nicesly_user_email');

    // Call your backend to create checkout session
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('nicesly_token')}`
      },
      body: JSON.stringify({
        productId: tier.stripeProductId,
        userId: userId,
        userEmail: userEmail
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { checkoutUrl } = await response.json();

    // Redirect to Stripe Checkout
    window.location.href = checkoutUrl;

  } catch (error) {
    console.error('Checkout error:', error);
    alert('Ett fel uppstod. Försök igen.');
    setSelectedTier(null);
    setRedirecting(false);
  }
};
```

---

## Price IDs (Måste skapas i Stripe Dashboard)

Du behöver skapa recurring prices för varje produkt i Stripe Dashboard:

1. Gå till **Products** i Stripe Dashboard
2. För varje produkt (prod_THSNuBtTi4dd8d, etc.):
   - Klicka på produkten
   - Lägg till en **recurring price**
   - Sätt belopp (49 kr, 99 kr, 119 kr)
   - Välj valuta: **SEK**
   - Välj intervall: **Monthly**
   - Aktivera price

### Exempel Price IDs (efter att du skapat dem):
```
AI-Brev:         price_xxx_ai_brev_49kr
AI-Brev + Kurir: price_xxx_ai_brev_kurir_99kr
Total AI-Ombud:  price_xxx_total_ombud_119kr
```

---

## Success & Cancel Pages

### Success Page (/success)

```javascript
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      // Verify session and update user
      verifyCheckout(sessionId);
    }
  }, [searchParams]);

  const verifyCheckout = async (sessionId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verify-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('nicesly_token')}`
        },
        body: JSON.stringify({ sessionId })
      });

      const data = await response.json();
      
      if (data.success) {
        setLoading(false);
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 3000);
      }
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-50">
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tack för ditt köp!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Din prenumeration är nu aktiv. Du omdirigeras till din dashboard...
        </p>
        
        {loading && (
          <div className="inline-block w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
}
```

---

## Webhook Configuration

1. Gå till **Developers > Webhooks** i Stripe Dashboard
2. Lägg till endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Välj events att lyssna på:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Kopiera webhook secret till `.env` som `STRIPE_WEBHOOK_SECRET`

---

## Testing

### Test Cards (Stripe Test Mode)
```
Success:          4242 4242 4242 4242
Decline:          4000 0000 0000 0002
3D Secure:        4000 0027 6000 3184
Insufficient:     4000 0000 0000 9995
```

**Test Mode Keys:**
- Publishable: `pk_test_...`
- Secret: `sk_test_...`

**Använd detta i .env för test:**
```env
STRIPE_SECRET_KEY=sk_test_your_test_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key
```

---

## Database Schema (MongoDB exempel)

```javascript
const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  stripeProductId: {
    type: String,
    enum: ['prod_THSNuBtTi4dd8d', 'prod_THSWpxmkl07VMr', 'prod_THSZuwWHLIDa4B']
  },
  tier: {
    type: String,
    enum: ['AI-Brev', 'AI-Brev + Kurir', 'Total AI-Ombud']
  },
  status: {
    type: String,
    enum: ['active', 'canceled', 'past_due', 'trialing'],
    default: 'active'
  },
  currentPeriodStart: Date,
  currentPeriodEnd: Date,
  cancelAtPeriodEnd: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

---

## Säkerhet

1. **HTTPS only** - Använd alltid HTTPS i produktion
2. **Validate webhook signature** - Verifiera alltid Stripe webhook signatures
3. **Server-side validation** - Validera alla produkter och priser på backend
4. **Rate limiting** - Implementera rate limiting på checkout endpoints
5. **CORS** - Konfigurera CORS för att bara tillåta din frontend domän

---

## Summary

**Flöde:**
1. User väljer tier → Frontend kallar backend
2. Backend skapar Stripe Checkout Session
3. User redirectas till Stripe Checkout
4. User fyller i kortuppgifter och betalar
5. Stripe redirectar till success URL
6. Webhook uppdaterar user i database
7. User redirectas till dashboard

**Viktigt:**
- Använd Test Mode under utveckling
- Testa alla scenarios (success, decline, 3D secure)
- Implementera proper error handling
- Logga alla transactions
- Skicka confirmation emails

---

## Nästa Steg

1. ✅ Skapa prices i Stripe Dashboard
2. ✅ Sätt upp backend med Express
3. ✅ Konfigurera webhooks
4. ✅ Testa med test cards
5. ✅ Deploy backend
6. ✅ Uppdatera frontend med API URL
7. ✅ Testa i staging
8. ✅ Aktivera live mode
9. ✅ Go live! 🚀
