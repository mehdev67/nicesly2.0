import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Brain, TrendingUp, CheckCircle, Lock, Users, ArrowRight, Menu, X, Zap, EyeOff, Scale, HardHat, QrCode, LogIn, Mail, AtSign, Globe } from 'lucide-react';
import { BasicDashboard, CourierDashboard, GuardianDashboard } from './MemberDashboard';

// --- Reusable Components (Defined outside main function) ---

const AICardShowcase = ({ simStep, simulationSteps, isCentered, isBankID }) => {
  const currentSimStep = simulationSteps[simStep];
  const progressColor = isBankID ? 'bg-gradient-to-r from-green-500 to-lime-600' : 'bg-gradient-to-r from-cyan-500 to-blue-600';
  const bgColor = isBankID ? 'bg-green-50 border-green-100' : 'bg-cyan-50 border-cyan-100';
  const textColor = isBankID ? 'text-green-600' : 'text-cyan-600';
  const shadowColor = isBankID ? 'shadow-green-200/50' : 'shadow-blue-200/50';

  return (
    <div className={`relative p-6 md:p-12 ${isCentered ? 'max-w-md mx-auto' : ''}`}>
      <div className={`relative bg-white rounded-[2.5rem] shadow-2xl ${shadowColor} p-6 sm:p-10 space-y-6 border border-gray-100`}>
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 ${progressColor} rounded-xl flex items-center justify-center shadow-lg`}>
            {isBankID ? <QrCode className="text-white" size={28} /> : <Brain className="text-white" size={28} />}
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">David AI</div>
            <div className="text-sm text-gray-500">{isBankID ? 'BankID-verifiering' : 'Din personliga assistent'}</div>
          </div>
        </div>
        <div className={`${bgColor} rounded-xl p-5 space-y-3 border`}>
          <div className="text-sm text-gray-700 font-medium">{isBankID ? 'BankID-flöde:' : 'David AI kör analys:'}</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${progressColor} h-2 rounded-full transition-all duration-1000`}
              style={{ width: currentSimStep.progress }}
            ></div>
          </div>
          {/* Dynamic Text Output */}
          <div className={`text-xs ${textColor} font-medium min-h-[1rem] transition-opacity duration-500`}>
            {currentSimStep.text}
          </div>
        </div>
        <div className="flex justify-between text-base border-t pt-4">
          <span className="text-gray-600 font-medium">Status:</span>
          <span className="font-bold text-blue-600">{isBankID ? 'Väntar på din signering' : '< 3 minuter'}</span>
        </div>
      </div>
    </div>
  );
};

const BankIDVerifyView = ({ personalNumber, setPersonalNumber, signing, handleBankIDSign, goToHome }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12 px-6 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full my-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-lime-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="text-white" size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Verifiera med BankID</h2>
          <p className="text-gray-600">För att slutföra din registrering behöver vi verifiera din identitet</p>
        </div>

        <div className="space-y-6">
          {/* Personal Number Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Personnummer
            </label>
            <input 
              type="text" 
              value={personalNumber}
              onChange={(e) => {
                const input = e.target.value;
                // Only allow digits and dash
                const cleaned = input.replace(/[^\d-]/g, '');
                // Limit to 13 characters total
                if (cleaned.length <= 13) {
                  setPersonalNumber(cleaned);
                }
              }}
              onBlur={() => {
                // Auto-format when user leaves the field
                const numbers = personalNumber.replace(/\D/g, '');
                if (numbers.length === 10 || numbers.length === 12) {
                  const formatted = numbers.length === 12 
                    ? numbers.slice(0, 8) + '-' + numbers.slice(8)
                    : numbers.slice(0, 6) + '-' + numbers.slice(6);
                  setPersonalNumber(formatted);
                }
              }}
              placeholder="ÅÅMMDD-XXXX eller ÅÅÅÅMMDD-XXXX"
              maxLength="13"
              disabled={signing}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-lg text-center font-medium focus:border-green-500 focus:outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Exempel: 901231-1234 eller 19901231-1234
            </p>
          </div>

          {/* Official BankID Button */}
          <button 
            onClick={handleBankIDSign}
            disabled={signing || !personalNumber}
            className="w-full px-6 py-5 bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-green-400/50 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {signing ? (
              <>
                <div className="w-6 h-6 mr-3 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Signerar med BankID...
              </>
            ) : (
              <>
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                Signera med BankID
              </>
            )}
          </button>

          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  <span className="font-bold">Säker identifiering:</span> Vi använder BankID för att säkerställa din identitet och skapa en digital fullmakt.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={goToHome} 
          disabled={signing}
          className="w-full text-sm text-gray-500 mt-6 hover:text-cyan-600 transition disabled:opacity-50"
        >
          ← Avbryt och gå tillbaka
        </button>
      </div>
    </div>
  );
};

const BankIDSuccessOverlay = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-fade-in">
      <div className="text-center px-6">
        <div className="mb-6">
          <div className="text-white text-4xl font-bold mb-4">NICESLY.SE</div>
          <div className="h-px bg-gray-500 w-full mb-8"></div>
        </div>
        
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-6">
          Inloggning i mobilappen<br />företag
        </h1>
        
        <div className="h-px bg-gray-500 w-full mb-8"></div>
        
        <div className="text-white text-lg leading-relaxed mb-8">
          <p className="font-bold mb-4">Tänk på!</p>
          <p className="text-gray-300">
            När du loggar in ska det alltid vara på ditt eget initiativ. Om du har blivit uppringd och ombedd att logga in kan det vara ett försök till bedrägeri, avsluta samtalet och kontakta oss på <span className="text-cyan-400">08-123 456 78</span>
          </p>
        </div>
        
        <div className="mt-12">
          <div className="inline-block px-8 py-4 bg-cyan-400 text-slate-900 rounded-lg text-lg font-semibold">
            Identifiera med säkerhetskod
          </div>
        </div>
      </div>
    </div>
  );
};

const TierSelectionView = ({ goToHome, onTierSelect }) => {
  const [localSelectedTier, setLocalSelectedTier] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const tiers = [
    {
      name: 'AI-Brev',
      price: '49 kr',
      stripeProductId: 'prod_THSNuBtTi4dd8d',
      description: 'AI skriver breven åt dig',
      features: [
        'AI skriver professionella brev',
        'Matchar mot juridiska invändningar',
        'PDF + redigerbar Word-fil'
      ],
      buttonClass: 'bg-gray-800 text-white hover:bg-gray-700',
      highlight: false
    },
    {
      name: 'AI-Brev + Kurir',
      price: '99 kr',
      stripeProductId: 'prod_THSWpxmkl07VMr',
      description: 'AI-brev med fysisk leverans',
      features: [
        'Allt i AI-Brev, plus:',
        { text: 'Mänsklig kurir levererar brevet fysiskt', bold: true },
        'Leveransspårning'
      ],
      buttonClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-400/50 hover:shadow-lg hover:scale-[1.02]',
      highlight: true,
      recommended: true
    },
    {
      name: 'Total AI-Ombud',
      price: '168 kr',
      oldPrice: '198 kr',
      stripeProductId: 'prod_THSZuwWHLIDa4B',
      description: 'AI-agent + David AI Guardian',
      features: [
        'Allt i AI-Brev + Kurir, plus:',
        { text: 'AI-agent hanterar samtal, SMS, e-post', bold: true },
        { text: '🛡️ David AI Guardian - Realtidsövervakning 24/7', bold: true, color: 'text-purple-600' },
        { text: 'Proaktiva varningar innan förfall', color: 'text-purple-600' },
        { text: 'Auto-kontaktar borgenärer vid risk', color: 'text-purple-600' },
        '20 samtal/mån ingår'
      ],
      buttonClass: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-400/50 hover:shadow-lg hover:scale-[1.02]',
      highlight: false,
      badge: '🛡️ GUARDIAN'
    }
  ];

  const handleTierSelect = async (tier) => {
    setLocalSelectedTier(tier.name);
    setRedirecting(true);

    try {
      // In production, you would do Stripe checkout here
      // For demo purposes, we'll go directly to dashboard
      console.log('Selected tier:', tier.name, 'Product ID:', tier.stripeProductId);

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 800));

      // Navigate to dashboard with selected tier
      onTierSelect(tier.name);

    } catch (error) {
      console.error('Selection error:', error);
      alert('Ett fel uppstod. Försök igen.');
      setLocalSelectedTier(null);
    } finally {
      setRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Välj din plan
          </h1>
          <p className="text-xl text-gray-600">
            Välkommen! Nu är det dags att välja vilket stöd du behöver.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {tiers.map((tier, index) => (
            <div 
              key={tier.name}
              className={`bg-white rounded-3xl shadow-xl overflow-hidden border ${
                tier.highlight 
                  ? 'border-4 border-cyan-500 transform scale-105 relative' 
                  : 'border-gray-100'
              } hover:shadow-2xl transition transform hover:-translate-y-1`}
            >
              {tier.recommended && (
                <div className="absolute top-4 right-4 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  REKOMMENDERAD
                </div>
              )}
              {tier.badge && (
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {tier.badge}
                </div>
              )}
              
              <div className={`p-8 text-center ${
                tier.highlight 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                  : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-semibold mb-2 uppercase tracking-widest ${
                  tier.highlight ? 'text-white' : 'text-cyan-600'
                }`}>
                  {tier.name}
                </p>
                
                <div className="flex items-center justify-center space-x-3 mb-2">
                  {tier.oldPrice && (
                    <span className={`text-2xl font-semibold line-through ${
                      tier.highlight ? 'text-white opacity-70' : 'text-gray-400'
                    }`}>
                      {tier.oldPrice}
                    </span>
                  )}
                  <span className={`text-5xl font-extrabold ${
                    tier.highlight ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tier.price}
                  </span>
                </div>
                
                <div className={`text-xl font-light ${
                  tier.highlight ? 'text-white opacity-90' : 'text-gray-600'
                }`}>
                  per månad
                </div>
                
                <p className={`text-sm mt-3 ${
                  tier.highlight ? 'text-white opacity-80' : 'text-gray-500'
                }`}>
                  {tier.description}
                </p>
              </div>
              
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className={`${
                        typeof feature === 'object' && feature.bold ? 'font-bold' : ''
                      } ${
                        typeof feature === 'object' && feature.color ? feature.color : 'text-gray-700'
                      }`}>
                        {typeof feature === 'object' ? feature.text : feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleTierSelect(tier)}
                  disabled={localSelectedTier === tier.name || redirecting}
                  className={`w-full px-6 py-4 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${tier.buttonClass}`}
                >
                  {localSelectedTier === tier.name ? (
                    redirecting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Laddar dashboard...
                      </div>
                    ) : (
                      'Vald ✓'
                    )
                  ) : (
                    `Välj ${tier.name}`
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={goToHome}
            disabled={redirecting}
            className="text-gray-500 hover:text-cyan-600 transition text-sm disabled:opacity-50"
          >
            ← Tillbaka till startsidan
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export default function NiceslyWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State for view management: 'home', 'bankid', 'generic-signin', 'login', 'bankid-verify', 'bankid-success', 'tier-selection'
  const [currentView, setCurrentView] = useState('home');
  const [simStep, setSimStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // New state for transition animation
  const [isLoading, setIsLoading] = useState(false); // Loading state for auth
  const [selectedProvider, setSelectedProvider] = useState(null); // Track selected provider
  const [personalNumber, setPersonalNumber] = useState(''); // Personal number for BankID
  const [signing, setSigning] = useState(false); // BankID signing state
  const [showBankIDSuccess, setShowBankIDSuccess] = useState(false); // Show BankID success screen
  const [selectedTier, setSelectedTier] = useState(null); // Track which tier was selected for dashboard

  // --- Simulation Steps ---

  const homeSimulationSteps = [
    { text: "OCR Scanning... Läser in dokument och identitetsbevis.", progress: '20%' },
    { text: "Genomför Bedrägeri Analys (Fraud Detection). Kontrollerar äkthet mot BankID.", progress: '40%' },
    { text: "Resonerar kring användarens input. Matchar mot juridiska invändningar.", progress: '60%' },
    { text: "Söker relevanta lagar: Inkassolagen, Preskriptionslag, Kreditupplysningslag, strategisk invändning.", progress: '80%' },
    { text: "Utvecklar strategi: Utforskar stöd för betalningslättnader och optimala lösningar.", progress: '100%' },
  ];

  const bankIDSimulationSteps = [
    { text: "Initierar BankID-app. Genererar unik QR-kod (HMAC SHA256).", progress: '20%' },
    { text: "BankID: Väntar på att du startar appen och skannar QR-koden.", progress: '40%' },
    { text: "BankID: Verifierar din identitet och signatur.", progress: '60%' },
    { text: "Signatur mottagen. Upprättar digital fullmakt för David AI.", progress: '80%' },
    { text: "Loggar in... Du omdirigeras till din dashboard.", progress: '100%' },
  ];

  const currentSimulationSteps = currentView === 'bankid' ? bankIDSimulationSteps : homeSimulationSteps;

  // --- Effects ---

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect for AI simulation
  useEffect(() => {
    // Only run simulation on 'home' and 'bankid' views
    if (currentView === 'home' || currentView === 'bankid') {
      const interval = setInterval(() => {
        setSimStep((prevStep) => (prevStep + 1) % currentSimulationSteps.length);
      }, 3500);
      return () => clearInterval(interval);
    } else {
      setSimStep(0); // Reset simulation step when not visible
    }
  }, [currentView, currentSimulationSteps.length]);


  // --- Navigation & Helper Functions ---
  
  // Custom transition duration
  const TRANSITION_DURATION = 700; 

  const goToBankID = useCallback((e) => {
    if (e) e.preventDefault();
    setCurrentView('bankid'); // Direct switch for BankID flow
  }, []);

  const goToGenericSignIn = useCallback((e) => {
    if (e) e.preventDefault();
    setIsTransitioning(true);
    // After animation duration, switch view
    setTimeout(() => {
      setCurrentView('generic-signin');
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  const goToLogin = useCallback((e) => {
    if (e) e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView('login');
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  const handleBankIDSign = useCallback(async () => {
    const numbers = personalNumber.replace(/\D/g, '');
    
    if (!personalNumber || numbers.length < 10) {
      alert('Vänligen ange ett giltigt personnummer (10 eller 12 siffror)');
      return;
    }

    setSigning(true);
    
    try {
      // Simulate BankID signing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('BankID signing for:', personalNumber);
      
      // Show success screen
      setShowBankIDSuccess(true);
      setSigning(false);
      
      // After 2 seconds, redirect to tier selection
      setTimeout(() => {
        setShowBankIDSuccess(false);
        setCurrentView('tier-selection');
      }, 2000);
      
    } catch (error) {
      console.error('BankID error:', error);
      alert('Ett fel uppstod med BankID. Försök igen.');
      setSigning(false);
    }
  }, [personalNumber]);

  const goToHome = useCallback((e) => {
    if (e) e.preventDefault();
    setCurrentView('home');
  }, []);

  // Authentication handlers
  const handleAuthProvider = useCallback(async (provider) => {
    setIsLoading(true);
    setSelectedProvider(provider);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Authenticating with ${provider}...`);
      
      // In a real app, you would:
      // 1. Call your backend API
      // 2. Handle OAuth flows for Google, Apple, Outlook
      // 3. Redirect to BankID verification for new signups
      
      // After successful account creation, go to BankID verification
      if (currentView === 'generic-signin') {
        // New user - needs BankID verification
        setCurrentView('bankid-verify');
      } else {
        // Existing user - login directly
        alert(`Loggar in med ${provider} - Integration kommer snart!`);
      }
      
    } catch (error) {
      console.error('Auth error:', error);
      alert('Ett fel uppstod. Försök igen.');
    } finally {
      setIsLoading(false);
      setSelectedProvider(null);
    }
  }, [currentView]);

  // --- Pricing Data ---

  const pricingTiers = [
    {
      title: "AI-Brev",
      price: "49 kr",
      oldPrice: null,
      description: "AI skapar juridiskt korrekta brev",
      features: [
        "AI-brev till banker, Kronofogden, Skatteverket",
        "Ladda upp faktura och välj orsak",
        "Välj lösning: dela upp, senarelägg eller avskriv",
        "Svar direkt i appen",
        "Ingen bindningstid",
      ],
      loyalty: "5% rabatt efter 3 mån, 10% efter 6 mån",
      buttonText: "Välj AI-Brev",
      buttonClass: "bg-gray-800 text-white hover:bg-gray-700 hover:scale-[1.01] active:scale-[0.99]",
      highlight: false,
      isRecommended: false
    },
    {
      title: "AI-Brev + Kurir",
      price: "99 kr",
      oldPrice: null,
      description: "AI-brev med fysisk leverans",
      features: [
        "Allt i AI-Brev, plus:",
        <span key="f1" className="font-bold">Mänsklig kurir levererar brevet fysiskt</span>,
        "Leveransspårning",
        "Professionell hantering",
      ],
      loyalty: "5% rabatt efter 3 mån, 10% efter 6 mån",
      buttonText: "Välj AI-Brev + Kurir",
      buttonClass: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-400/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
      highlight: true,
      isRecommended: true
    },
    {
      title: "Total AI-Ombud",
      price: "168 kr",
      oldPrice: "198 kr",
      description: "AI-agent hanterar all kommunikation + David AI Guardian",
      features: [
        "Allt i AI-Brev + Kurir, plus:",
        <span key="f2" className="font-bold">AI-agent hanterar samtal, SMS, e-post till inkasso</span>,
        <span key="f3" className="font-bold text-purple-600">🛡️ David AI Guardian - Realtidsövervakning 24/7</span>,
        <span key="f4" className="text-purple-600">Proaktiva varningar innan betalningar förfaller</span>,
        <span key="f5" className="text-purple-600">Auto-kontaktar borgenärer vid risk för förfall</span>,
        "Fullmakt signeras med Scrive",
        "20 samtal/mån ingår (0,50 kr/extra samtal)",
        "Dashboard med svensk skuldstatistik",
        "Privat användarforum",
        "Prioriterad support",
      ],
      loyalty: "5% rabatt efter 3 mån, 10% efter 6 mån",
      buttonText: "Välj Total AI-Ombud",
      buttonClass: "bg-gray-800 text-white hover:bg-gray-700 hover:scale-[1.01] active:scale-[0.99]",
      highlight: false,
      isRecommended: false
    },
  ];

  // --- Nested Components (Must be defined here to access callbacks and state) ---

  const PricingCard = ({ title, price, oldPrice, description, features, buttonText, buttonClass, highlight, isRecommended, loyalty }) => (
    <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border ${highlight ? 'border-4 border-cyan-500 shadow-2xl shadow-cyan-300/50' : 'border-gray-100 shadow-gray-200/50'} flex flex-col transition transform hover:-translate-y-1`}>
      <div className={`p-8 text-center ${highlight ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <p className={`text-sm font-semibold mb-2 uppercase tracking-widest ${highlight ? 'text-white' : 'text-cyan-600'}`}>{title}</p>
        
        {/* Price Display: Handles strikethrough for oldPrice */}
        <div className="flex items-center justify-center space-x-3 mb-2 leading-none">
          {oldPrice && (
            <span className={`text-2xl font-semibold opacity-70 line-through ${highlight ? 'text-white' : 'text-gray-400'}`}>
              {oldPrice}
            </span>
          )}
          <span className="text-5xl font-extrabold">{price}</span>
        </div>
        {/* End Price Display */}
        
        <div className={`text-xl font-light opacity-90 ${highlight ? 'text-white' : 'text-gray-600'}`}>per månad</div>
        {description && <p className={`text-sm mt-3 ${highlight ? 'opacity-80' : 'text-gray-500'}`}>{description}</p>}
        {isRecommended && (
          <div className="mt-3 inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase">Mest Populär</div>
        )}
      </div>
      
      <div className={`p-8 space-y-4 flex-grow ${highlight ? 'bg-white' : ''}`}>
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <CheckCircle className={`mt-1 flex-shrink-0 ${highlight ? 'text-cyan-500' : 'text-green-500'}`} size={20} />
            <span className={`text-base ${highlight ? 'font-medium' : 'text-gray-700'}`}>{feature}</span>
          </div>
        ))}
      </div>

      {/* Loyalty Discount Badge */}
      {loyalty && (
        <div className="px-8 pb-4">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-3 text-center">
            <p className="text-xs font-semibold text-yellow-800">🎉 Lojalitetsbonus</p>
            <p className="text-xs text-yellow-700 mt-1">{loyalty}</p>
          </div>
        </div>
      )}

      <div className="p-8 bg-gray-50 text-center border-t border-gray-100">
        <button onClick={highlight ? goToBankID : goToGenericSignIn} className={`w-full px-12 py-3 rounded-full text-lg font-semibold transition ${buttonClass}`}>
          {buttonText}
        </button>
      </div>
    </div>
  );


  const BankIDView = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6">
      <div className="max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Verifiera med BankID</h2>
        <p className="text-gray-600 text-center mb-8">För att vi ska kunna agera som ditt ombud behöver vi din digitala fullmakt via BankID</p>
        
        {/* Personal Number Input */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Personnummer (ÅÅMMDD-XXXX)
          </label>
          <input 
            type="text" 
            placeholder="19900101-1234"
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-lg focus:border-cyan-500 focus:outline-none transition"
            maxLength="13"
          />
          
          <button 
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-500 to-lime-600 text-white rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-green-400/50 transition transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center">
              <QrCode className="w-5 h-5 mr-2" /> 
              Öppna BankID på telefonen
            </div>
          </button>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-sm text-green-800">
              <span className="font-bold">💡 Nästa steg:</span> När du klickar kommer BankID-appen att öppnas på din telefon. Följ instruktionerna för att signera fullmakten.
            </p>
          </div>
        </div>

        {/* AI Card Simulation Below */}
        <AICardShowcase 
          simStep={simStep} 
          simulationSteps={bankIDSimulationSteps} 
          isCentered={true} 
          isBankID={true} 
        />

        <div className="mt-8 text-center">
          <button 
            onClick={goToHome} 
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Avbryt och återgå till startsidan
          </button>
        </div>
      </div>
    </div>
  );

  const GenericSignInView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full my-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Skapa konto</h2>
          <p className="text-gray-600">Välj hur du vill registrera dig och komma igång</p>
        </div>
        
        <div className="space-y-3">
          {/* Google */}
          <button 
            onClick={() => handleAuthProvider('Google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && selectedProvider === 'Google' ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                Skapar konto...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Fortsätt med Google
              </>
            )}
          </button>

          {/* Apple */}
          <button 
            onClick={() => handleAuthProvider('Apple')}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && selectedProvider === 'Apple' ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                Skapar konto...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Fortsätt med Apple
              </>
            )}
          </button>

          {/* Outlook/Microsoft */}
          <button 
            onClick={() => handleAuthProvider('Outlook')}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && selectedProvider === 'Outlook' ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                Skapar konto...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#0078D4" d="M23 5.5V18.5C23 19.327 22.327 20 21.5 20H2.5C1.673 20 1 19.327 1 18.5V5.5C1 4.673 1.673 4 2.5 4H21.5C22.327 4 23 4.673 23 5.5Z"/>
                  <path fill="#FFF" d="M12 13.5L5 9V7L12 11.5L19 7V9L12 13.5Z"/>
                </svg>
                Fortsätt med Outlook
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">eller</span>
            </div>
          </div>

          {/* Generic Email */}
          <button 
            onClick={() => handleAuthProvider('E-post')}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && selectedProvider === 'E-post' ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                Skapar konto...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-3 text-gray-600" />
                Fortsätt med e-post
              </>
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Har du redan ett konto?{' '}
            <button 
              onClick={goToLogin}
              disabled={isLoading}
              className="text-cyan-600 font-semibold hover:underline"
            >
              Logga in här
            </button>
          </p>
        </div>

        <button 
          onClick={goToHome} 
          disabled={isLoading}
          className="w-full text-sm text-gray-500 mt-4 hover:text-cyan-600 transition disabled:opacity-50"
        >
          ← Tillbaka till startsidan
        </button>

        <p className="text-xs text-gray-400 text-center mt-6">
          Genom att skapa konto godkänner du våra <span className="text-cyan-600 hover:underline cursor-pointer">användarvillkor</span> och <span className="text-cyan-600 hover:underline cursor-pointer">integritetspolicy</span>
        </p>
      </div>
    </div>
  );

  const LoginView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full my-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Logga in</h2>
          <p className="text-gray-600">Välkommen tillbaka till Mitt Nicesly</p>
        </div>
        
        <div className="space-y-3">
          {/* Google */}
          <button 
            onClick={() => handleAuthProvider('Google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && selectedProvider === 'Google' ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                Loggar in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Logga in med Google
              </>
            )}
          </button>

          {/* Apple */}
          <button 
            onClick={() => handleAuthProvider('Apple')}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && selectedProvider === 'Apple' ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                Loggar in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Logga in med Apple
              </>
            )}
          </button>

          {/* Outlook/Microsoft */}
          <button 
            onClick={() => handleAuthProvider('Outlook')}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && selectedProvider === 'Outlook' ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                Loggar in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#0078D4" d="M23 5.5V18.5C23 19.327 22.327 20 21.5 20H2.5C1.673 20 1 19.327 1 18.5V5.5C1 4.673 1.673 4 2.5 4H21.5C22.327 4 23 4.673 23 5.5Z"/>
                  <path fill="#FFF" d="M12 13.5L5 9V7L12 11.5L19 7V9L12 13.5Z"/>
                </svg>
                Logga in med Outlook
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">eller</span>
            </div>
          </div>

          {/* Generic Email */}
          <button 
            onClick={() => handleAuthProvider('E-post')}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && selectedProvider === 'E-post' ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                Loggar in...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-3 text-gray-600" />
                Logga in med e-post
              </>
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Inget konto än?{' '}
            <button 
              onClick={goToGenericSignIn}
              disabled={isLoading}
              className="text-cyan-600 font-semibold hover:underline"
            >
              Skapa konto här
            </button>
          </p>
        </div>

        <button 
          onClick={goToHome} 
          disabled={isLoading}
          className="w-full text-sm text-gray-500 mt-4 hover:text-cyan-600 transition disabled:opacity-50"
        >
          ← Tillbaka till startsidan
        </button>
      </div>
    </div>
  );

  const HomeContent = ({ goToBankID }) => (
    <>
      {/* Hero Section */}
      <section className={`pt-40 pb-28 px-4 ${heroBgClass}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                Den första digitala
                <span className="block mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  skuldskölden
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Ingen på marknaden gör det vi gör. Vi är ett proaktivt, AI-drivet juridiskt ombud för gäldenärer – utan nya lån. Stöd utan väntetid. Skydd utan att tömma din ekonomi.
              </p>
              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">337,000+</span> svenskar har skulder hos Kronofogden. Ännu fler ligger i riskzonen. Hjälp som är till för folket, inte för systemet.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={goToGenericSignIn} 
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-lg font-semibold hover:shadow-cyan-400/70 shadow-xl transition transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                >
                  Agera idag
                  <ArrowRight className="ml-2" size={20} />
                </button>
                <a href="#how" className="inline-block px-8 py-4 border-2 border-cyan-500 text-cyan-600 rounded-full text-lg font-semibold hover:bg-cyan-50 transition transform hover:shadow-md active:scale-[0.98] text-center">
                  Se hur det fungerar
                </a>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 items-center text-base text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span>Svar på under 3 minuter</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span>Från 49 kr/mån</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span>Ingen bindningstid</span>
                </div>
              </div>
            </div>

            {/* AI Showcase Card (SIMULATED) */}
            <AICardShowcase 
              simStep={simStep} 
              simulationSteps={homeSimulationSteps} 
              isCentered={false} 
              isBankID={false} 
            />
          </div>
        </div>
      </section>

      {/* Why People Don't Act Section */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Därför är det svårt att agera</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Här är de fyra absolut vanligaste orsakerna som gör att människor inte agerar i tid och därmed riskerar att hamna i djupare skuld.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Avoidance Behavior */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 border-t-4 border-red-400 shadow-md">
              <EyeOff className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Undvikandebeteende</h3>
              <p className="text-gray-600 text-sm">
                Många skjuter upp att ta tag i ekonomiska problem på grund av skam, skuld eller rädsla för att "bli avslöjade" som oansvariga. Det skapar en slags psykologisk förlamning.
              </p>
            </div>

            {/* Lack of Financial Overview */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border-t-4 border-yellow-500 shadow-md">
              <Scale className="text-yellow-600 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Brist på ekonomisk överblick</h3>
              <p className="text-gray-600 text-sm mb-3">
                Många har inte ett system för att hålla koll på sina lån, räntor och inkomster. De vet inte exakt hur mycket de är skyldiga.
              </p>
              <p className="text-xs text-gray-500 italic">
                Exempel: Ett lån på 350 000 kr som leder till nästan 700 000 kr i total återbetalning över 15 år – något som inte alltid förstås vid signering.
              </p>
            </div>

            {/* Stress and Overload */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-t-4 border-indigo-400 shadow-md">
              <Zap className="text-indigo-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Stress och överbelastning</h3>
              <p className="text-gray-600 text-sm mb-3">
                När livet blir för pressat – jobb, barn, sjukdom – faller ekonomi ofta ner på prioriteringslistan. Det handlar inte om ovilja, utan kapacitetsbrist.
              </p>
              <p className="text-xs text-gray-500 italic">
                Exempel: Att inte öppna brev från banken, undvika UC-förfrågningar, eller ignorera inkassokrav.
              </p>
            </div>

            {/* Overestimation of Future Control */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border-t-4 border-cyan-400 shadow-md">
              <HardHat className="text-cyan-600 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Överskattning av framtida kontroll</h3>
              <p className="text-gray-600 text-sm mb-3">
                Man tror ofta att "nästa månad blir det bättre" – t.ex. att man får mer jobb eller att skatten kommer. Det leder till passivitet nu.
              </p>
              <p className="text-xs text-gray-500 italic">
                Exempel: Att fortsätta använda kreditkort eller ta nya lån trots att återbetalningsförmågan redan är ansträngd.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center border-t border-b py-6">
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">337,000+</div>
              <div className="text-gray-600 mt-2 text-lg font-medium">Svenskar med skulder hos KFM</div>
            </div>
            <div className="border-l border-r border-gray-200">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">&lt;3 min</div>
              <div className="text-gray-600 mt-2 text-lg font-medium">Genomsnittlig svarstid (AI)</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">49 kr</div>
              <div className="text-gray-600 mt-2 text-lg font-medium">Pris från, ingen bindning</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Hur Nicesly fungerar</h2>
            <p className="text-xl text-gray-600">Tre enkla steg till ekonomisk trygghet med David AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 border-t-4 border-cyan-500">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">1. Skapa konto & Auktorisera</h3>
              <p className="text-gray-600">Logga in säkert med BankID. Genom att ge oss en fullmakt kan David AI agera direkt för din räkning.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 border-t-4 border-blue-500">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Brain className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">2. David analyserar & Förhandlar</h3>
              <p className="text-gray-600">AI:n identifierar juridiska svagheter och den optimala strategin. Vi tar sedan över kommunikationen med fordringsägarna.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 border-t-4 border-purple-500">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">3. Bygg upp din kredit</h3>
              <p className="text-gray-600">Allt eftersom vi hanterar dina ärenden, rapporterar vi dina betalningar för att aktivt bygga upp din kreditvärdighet (UC).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Varför välja Nicesly?</h2>
            <p className="text-xl text-gray-600">Ingen gör det vi gör. Vi är den första digitala skuldskölden i Sverige.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                icon: <Shield size={28} />,
                title: "Juridiskt ombudskap med AI",
                description: "David AI är tränad på svensk skuldlagstiftning - Inkassolagen, Preskriptionslag, Kreditupplysningslag. Första systemet i Sverige som juridiskt korrekt hjälper gäldenärer."
              },
              {
                icon: <Brain size={28} />,
                title: "Proaktivt skydd - innan det blir kris",
                description: "Vi stoppar eskalerande processer innan de skadar dig. Ingen väntan på kontorstider. David arbetar för dig 24/7 med omedelbar analys och respons."
              },
              {
                icon: <CheckCircle size={28} />,
                title: "Inga nya skulder - bara lösningar",
                description: "Till skillnad från refinansiering eller lånehjälp löser vi dina problem utan att belasta dig med nya lån eller räntor som förvärrar situationen."
              },
              {
                icon: <TrendingUp size={28} />,
                title: "Aktiv kredituppbyggnad",
                description: "Vi rapporterar dina medlemsbetalningar till UC - något som är ovanligt men avgörande för att bygga upp din kreditvärdighet på köpet."
              },
              {
                icon: <Zap size={28} />,
                title: "Hjälp direkt - under 3 minuter",
                description: "Ingen ska behöva boka möten, stå i kö eller lida en dag till. Du får juridisk analys med lagar, paragrafer och motivering direkt efter att du laddat upp ditt dokument."
              },
              {
                icon: <Users size={28} />,
                title: "För folket, inte systemet",
                description: "Vi står på din sida. Du slipper dyra advokater (höga arvoden) och tung traditionell skuldrådgivning. Transparent pris som alla har råd med."
              },
              {
                icon: <Lock size={28} />,
                title: "Säkerhet i toppklass",
                description: "All AI-logik körs inom Google Cloud Console. BankID-autentisering och Scrive för fullmakter. Dina känsliga uppgifter hanteras säkert."
              },
              {
                icon: <HardHat size={28} />,
                title: "Verklig skalbarhet & unikt",
                description: "Ingen på marknaden kombinerar juridisk representation, AI-automation, kreditåteruppbyggnad och proaktivt skydd. Vi är ensamma i vårt fält."
              }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start space-x-5 p-4 rounded-xl hover:bg-gray-50 transition">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Transparent Prissättning</h2>
            <p className="text-xl text-gray-600">Välj den skyddsnivå och kommunikationsform som passar din situation bäst</p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-stretch">
            
            {/* 49 kr Card (DIY) */}
            <PricingCard {...pricingTiers[0]} />

            {/* 99 kr Card (Digital Ombud - HIGHLIGHTED) */}
            <PricingCard {...pricingTiers[1]} />

            {/* 179 kr Card (Total Ombud - VOICE) */}
            <PricingCard {...pricingTiers[2]} />

          </div>
          <div className="text-center mt-12 text-gray-600">
              <p className="text-sm">Alla abonnemang har ingen bindningstid och kan sägas upp när som helst.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Redo att ta kontroll över din ekonomi?</h2>
          <p className="text-xl mb-10 opacity-90">
            Sluta känna dig som en ensam David mot jättar. Över **337,000 svenskar** behöver hjälp, och vi ger dig vapnet att vinna tillbaka din ekonomiska frihet.
          </p>
          <button 
            onClick={goToBankID} 
            className="px-12 py-4 bg-white text-cyan-600 rounded-full text-xl font-semibold hover:shadow-lg transition transform hover:scale-105 active:scale-[0.98]"
          >
            Kom igång idag
          </button>
        </div>
      </section>
    </>
  );

  // --- Conditional Rendering of Layout ---

  let heroBgClass = 'bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50';
  let content = <HomeContent goToBankID={goToBankID} />;

  if (currentView === 'bankid') {
    heroBgClass = 'bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50'; // Nicesly Green Gradient
    content = <BankIDView />;
  } else if (currentView === 'generic-signin') {
    heroBgClass = 'bg-white';
    content = <GenericSignInView />;
  } else if (currentView === 'login') {
    heroBgClass = 'bg-white';
    content = <LoginView />;
  } else if (currentView === 'bankid-verify') {
    heroBgClass = 'bg-white';
    content = <BankIDVerifyView 
      personalNumber={personalNumber}
      setPersonalNumber={setPersonalNumber}
      signing={signing}
      handleBankIDSign={handleBankIDSign}
      goToHome={goToHome}
    />;
  } else if (currentView === 'tier-selection') {
    heroBgClass = 'bg-white';
    content = <TierSelectionView
      goToHome={goToHome}
      onTierSelect={(tierName) => {
        setSelectedTier(tierName);
        setCurrentView('dashboard');
      }}
    />;
  } else if (currentView === 'dashboard') {
    heroBgClass = 'bg-white';
    // Render appropriate dashboard based on selected tier
    if (selectedTier === 'AI-Brev') {
      content = <BasicDashboard goToHome={goToHome} />;
    } else if (selectedTier === 'AI-Brev + Kurir') {
      content = <CourierDashboard goToHome={goToHome} />;
    } else if (selectedTier === 'Total AI-Ombud') {
      content = <GuardianDashboard goToHome={goToHome} />;
    } else {
      // Fallback to basic if tier not recognized
      content = <BasicDashboard goToHome={goToHome} />;
    }
  }

  return (
    <>
      {/* Custom Styles */}
      <style>
        {`
          /* Custom animations for a professional feel */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }

          /* Mega Deluxe Transition Animation */
          @keyframes transitionExpand {
            0% { transform: scale(0.1); opacity: 0.5; }
            50% { transform: scale(100); opacity: 1; }
            100% { transform: scale(100); opacity: 0; }
          }
          .animate-transition-expand {
              animation: transitionExpand 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }

          .font-inter {
              font-family: 'Inter', sans-serif;
          }
          .transition-max-height {
            transition: max-height 0.3s ease-in-out;
          }
        `}
      </style>

      {/* BankID Success Overlay */}
      <BankIDSuccessOverlay show={showBankIDSuccess} />

      <div className="min-h-screen bg-white font-inter">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg backdrop-blur-sm bg-opacity-95' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-2xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent cursor-pointer" onClick={goToHome}>
                nicesly.
              </div>
              
              {/* Desktop Menu & Buttons */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#how" className="text-gray-700 hover:text-cyan-600 transition font-medium">Hur det fungerar</a>
                <a href="#benefits" className="text-gray-700 hover:text-cyan-600 transition font-medium">Fördelar</a>
                <a href="#pricing" className="text-gray-700 hover:text-cyan-600 transition font-medium">Pris</a>
                
                {/* Mitt Nicesly Button replaces "Kom igång" */}
                <button 
                  onClick={goToLogin} 
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-cyan-400/50 shadow-md transition transform hover:scale-105"
                >
                  Mitt Nicesly
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="bg-white border-t py-4 space-y-3 px-6 shadow-xl">
              <a href="#how" className="block text-gray-700 font-medium py-2 hover:text-cyan-600 transition" onClick={() => { setMobileMenuOpen(false); goToHome(); }}>Hur det fungerar</a>
              <a href="#benefits" className="block text-gray-700 font-medium py-2 hover:text-cyan-600 transition" onClick={() => { setMobileMenuOpen(false); goToHome(); }}>Fördelar</a>
              <a href="#pricing" className="block text-gray-700 font-medium py-2 hover:text-cyan-600 transition" onClick={() => { setMobileMenuOpen(false); goToHome(); }}>Pris</a>
              <button 
                onClick={() => { setMobileMenuOpen(false); goToLogin(); }} 
                className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold"
              >
                Mitt Nicesly
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main>
          {content}
        </main>

        {/* Footer (Only shows on home/bankid views) */}
        {currentView !== 'generic-signin' && currentView !== 'login' && currentView !== 'bankid-verify' && currentView !== 'tier-selection' && (
            <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-5 gap-10 border-b border-gray-800 pb-8">
                  <div className="md:col-span-2">
                    <div className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      nicesly.
                    </div>
                    <p className="text-gray-400 max-w-sm">
                      AI-driven ekonomisk assistans. Hjälp som är till för folket, inte för systemet.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-cyan-400">Tjänster</h4>
                    <ul className="space-y-2 text-gray-400 text-base">
                      <li className="hover:text-cyan-200 transition cursor-pointer">Fullmaktstjänster</li>
                      <li className="hover:text-cyan-200 transition cursor-pointer">Ekonomisk assistans (AI)</li>
                      <li className="hover:text-cyan-200 transition cursor-pointer">Kredituppbyggnad</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-cyan-400">Företag</h4>
                    <ul className="space-y-2 text-gray-400 text-base">
                      <li className="hover:text-cyan-200 transition cursor-pointer">Om oss</li>
                      <li className="hover:text-cyan-200 transition cursor-pointer">Kontakt</li>
                      <li className="hover:text-cyan-200 transition cursor-pointer">Karriär</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4 text-cyan-400">Juridiskt</h4>
                    <ul className="space-y-2 text-gray-400 text-base">
                      <li className="hover:text-cyan-200 transition cursor-pointer">Integritetspolicy</li>
                      <li className="hover:text-cyan-200 transition cursor-pointer">Användarvillkor</li>
                      <li className="hover:text-cyan-200 transition cursor-pointer">GDPR</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 text-center text-gray-500 text-sm">
                  <p>© 2025 Nicesly - PlayPace Brand & Business Services AB. Alla rättigheter förbehållna.</p>
                  <p className="mt-2">Byggt med AI-teknologi från Google.</p>
                </div>
              </div>
            </footer>
        )}
      </div>
      
      {/* MEGA DELUXE TRANSITION OVERLAY */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div 
            className="absolute top-0 right-0 w-8 h-8 
                       transform scale-0 origin-top-right rounded-full 
                       bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-400/70 
                       animate-transition-expand"
          >
          </div>
        </div>
      )}
    </>
  );
}
