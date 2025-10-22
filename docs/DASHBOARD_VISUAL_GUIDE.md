# Nicesly Medlemssida - Visual Guide

## Dashboard-komponenter per tier

---

## 🎯 Översikt - Alla Tiers

Alla användare ser en översiktssida med:
- Välkomstmeddelande
- Statistikkort (anpassade efter tier)
- Senaste aktivitet
- Snabblänkar

---

## 📊 AI-Brev (49 kr/mån)

### Tillgängliga sektioner:
✅ Översikt
✅ Mina Brev
✅ Inställningar

### Features:

#### 1. **Översikt**
```
┌─────────────────────────────────────────┐
│ Välkommen tillbaka, Anna!               │
│                                         │
│ ┌──────┐  ┌──────┐                    │
│ │  📄  │  │      │                    │
│ │  15  │  │ ... │                    │
│ │Brev  │  │     │                    │
│ └──────┘  └──────┘                    │
│                                         │
│ SENASTE AKTIVITET                       │
│ • Invändning mot faktura - Skickad      │
│ • Betalningspåminnelse - Utkast         │
│ • Avbetalningsplan - Levererad          │
└─────────────────────────────────────────┘
```

#### 2. **Mina Brev**
- Lista över alla brev
- Status: Utkast / Skickad / Levererad
- Skapa nytt brev (AI-genererat)
- Redigera befintliga brev
- Ladda ner PDF + Word
- Filtrera och sök

```
┌─────────────────────────────────────────┐
│  [+ Nytt Brev]            [🔍 Sök...]  │
│                                         │
│ ┌─────────────────────────────────┐    │
│ │ Invändning mot faktura          │    │
│ │ Till: Inkasso AB    [Skickad]   │    │
│ │ 2024-10-15          [👁️][✏️][📥]  │    │
│ └─────────────────────────────────┘    │
│ ┌─────────────────────────────────┐    │
│ │ Betalningspåminnelse            │    │
│ │ Till: Collector     [Utkast]    │    │
│ │ 2024-10-20          [👁️][✏️][📥]  │    │
│ └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

#### 3. **Skapa Nytt Brev - Workflow**
1. Välj typ av brev (Invändning, Betalningsplan, etc.)
2. Fyll i detaljer om ärendet
3. AI genererar professionellt brev
4. Granska och redigera
5. Ladda ner PDF + Word-fil
6. Skriv ut och skicka själv

---

## 🚚 AI-Brev + Kurir (99 kr/mån)

### Tillgängliga sektioner:
✅ Översikt
✅ Mina Brev
✅ Leveranser ⭐ NYT
✅ Inställningar

### Features:

#### 1. **Översikt** (Utökad)
```
┌─────────────────────────────────────────┐
│ Välkommen tillbaka, Anna!               │
│                                         │
│ ┌──────┐  ┌──────┐  ┌──────┐          │
│ │  📄  │  │  🚚  │  │      │          │
│ │  15  │  │  2   │  │ ... │          │
│ │Brev  │  │Aktiv │  │     │          │
│ └──────┘  └──────┘  └──────┘          │
│                                         │
│ SENASTE AKTIVITET                       │
│ • Invändning - Levererad ✓              │
│   Spårning: NK123456789SE               │
│ • Betalningspåminnelse - På väg 🚚      │
│ • Avbetalningsplan - Levererad ✓        │
└─────────────────────────────────────────┘
```

#### 2. **Mina Brev** (Utökad)
- Alla features från AI-Brev +
- **Boka kurir direkt från listan**
- Se spårningsnummer
- Status inkluderar leveransstatus

```
┌─────────────────────────────────────────┐
│  [+ Nytt Brev]            [🔍 Sök...]  │
│                                         │
│ ┌─────────────────────────────────┐    │
│ │ Invändning mot faktura          │    │
│ │ Till: Inkasso AB   [Levererad ✓]│    │
│ │ 2024-10-15                       │    │
│ │ 📦 Spårning: NK123456789SE      │    │
│ │              [👁️][✏️][📥][📍]     │    │
│ └─────────────────────────────────┘    │
│ ┌─────────────────────────────────┐    │
│ │ Betalningspåminnelse            │    │
│ │ Till: Collector     [Utkast]    │    │
│ │ 2024-10-20                       │    │
│ │              [👁️][✏️][📥][🚚 Boka] │    │
│ └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

#### 3. **Leveranser** ⭐ NYT
```
┌─────────────────────────────────────────┐
│ LEVERANSER                              │
│                                         │
│ AKTIVA LEVERANSER                       │
│ ┌─────────────────────────────────┐    │
│ │ SPÅRNINGSNUMMER                 │    │
│ │ NK123456789SE        [Levererad]│    │
│ │                                  │    │
│ │ 📍 Inkasso AB                    │    │
│ │    Storgatan 1, Stockholm        │    │
│ │                                  │    │
│ │ LEVERANSHISTORIK:                │    │
│ │ ● Levererad                      │    │
│ │ │ 2024-10-18 14:30 - Stockholm   │    │
│ │ ○ Ute för leverans               │    │
│ │ │ 2024-10-18 09:15 - Stockholm   │    │
│ │ ○ Sorterat                       │    │
│ │ │ 2024-10-17 16:20 - Distr.cntr  │    │
│ │ ○ Mottagen                       │    │
│ │   2024-10-16 10:00 - Nicesly     │    │
│ └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

#### 4. **Boka Kurir - Workflow**
1. Välj vilket brev som ska levereras
2. Bekräfta mottagaradress
3. Välj leveransdatum
4. Få spårningsnummer
5. Spåra leverans i realtid
6. Få notifikation när levererad

---

## 🤖 Total AI-Ombud (119 kr/mån)

### Tillgängliga sektioner:
✅ Översikt
✅ Mina Brev
✅ Leveranser
✅ AI-Ombud ⭐ NYT
✅ Ärenden ⭐ NYT
✅ Inställningar

### Features:

#### 1. **Översikt** (Fullständig)
```
┌─────────────────────────────────────────┐
│ Välkommen tillbaka, Anna!               │
│                                         │
│ ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐│
│ │  📄  │  │  🚚  │  │  📞  │  │  📈  ││
│ │  15  │  │  2   │  │  8   │  │45,000││
│ │Brev  │  │Aktiv │  │Samtal│  │Sparat││
│ └──────┘  └──────┘  └──────┘  └──────┘│
│                                         │
│ SENASTE AKTIVITET                       │
│ • AI-samtal med Inkasso AB - Löst ✓    │
│   Betalningsplan överenskommen          │
│ • Invändning - Levererad ✓              │
│ • AI-samtal med Collector - Avslutad   │
└─────────────────────────────────────────┘
```

#### 2. **AI-Ombud** ⭐ NYT
```
┌─────────────────────────────────────────┐
│ AI-OMBUD                                │
│                      [12 samtal kvar]   │
│                                         │
│ ┌──────┐  ┌──────┐  ┌──────┐          │
│ │  📞  │  │  ✓   │  │  ⏱️  │          │
│ │  8   │  │ 85%  │  │ 4:32 │          │
│ │Samtal│  │Lyckat│  │Snitt │          │
│ └──────┘  └──────┘  └──────┘          │
│                                         │
│ SENASTE SAMTAL                          │
│ ┌─────────────────────────────────┐    │
│ │ 📞 Inkasso AB                    │    │
│ │    2024-10-20 14:30              │    │
│ │    Längd: 4:32                   │    │
│ │    ✓ Betalningsplan överensk.    │    │
│ │                           [▶️]    │    │
│ └─────────────────────────────────┘    │
│ ┌─────────────────────────────────┐    │
│ │ 📞 Collector Bank                │    │
│ │    2024-10-18 11:20              │    │
│ │    Längd: 2:15                   │    │
│ │    ✓ Förlängd betalningstid      │    │
│ │                           [▶️]    │    │
│ └─────────────────────────────────┘    │
│                                         │
│ AI-INSTÄLLNINGAR                        │
│ ┌─────────────────────────────────┐    │
│ │ Automatiska SMS-svar      [ON]  │    │
│ │ Automatiska samtal        [ON]  │    │
│ │ E-post hantering         [OFF]  │    │
│ └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

#### 3. **Ärenden** ⭐ NYT
```
┌─────────────────────────────────────────┐
│ MINA ÄRENDEN                            │
│                                         │
│ ┌─────────────────────────────────┐    │
│ │ Inkasso AB          [Aktiv]     │    │
│ │ 12,450 kr                        │    │
│ │                                  │    │
│ │ 📅 Senaste kontakt: 2024-10-20   │    │
│ │ 📞 5 AI-interaktioner            │    │
│ │                   [Visa detaljer]│    │
│ └─────────────────────────────────┘    │
│ ┌─────────────────────────────────┐    │
│ │ Collector Bank      [Löst ✓]    │    │
│ │ 8,200 kr                         │    │
│ │                                  │    │
│ │ 📅 Senaste kontakt: 2024-10-15   │    │
│ │ 📞 3 AI-interaktioner            │    │
│ │                   [Visa detaljer]│    │
│ └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

#### 4. **AI-Agent Capabilities**
- **Automatiska samtal** till inkassobolag
- **SMS-hantering** med automatiska svar
- **E-post kommunikation** (kan aktiveras)
- **Inspelningar** av alla samtal
- **Transkript** av konversationer
- **Sammanfattningar** av resultat
- **Betalningsplaner** som AI förhandlar fram
- **Notifikationer** om viktiga händelser

#### 5. **Ärende-detaljer**
```
┌─────────────────────────────────────────┐
│ INKASSO AB - ÄRENDE #001                │
│                                         │
│ ÖVERSIKT                                │
│ Skuld: 12,450 kr                        │
│ Status: Aktiv betalningsplan            │
│ Nästa betalning: 2024-11-01 (1,000 kr) │
│                                         │
│ TIDSLINJE                               │
│ ● 2024-10-20 - AI-samtal ✓              │
│   Betalningsplan överenskommen          │
│   6 månader, 1,000 kr/mån               │
│                                         │
│ ○ 2024-10-15 - Brev skickat              │
│   Invändning mot ursprunglig faktura    │
│                                         │
│ ○ 2024-10-10 - Ärendet registrerat       │
│   Initial inkassokravet mottaget        │
│                                         │
│ DOKUMENT                                │
│ • Invändningsbrev.pdf                   │
│ • Betalningsplan_avtal.pdf              │
│ • AI-samtal_inspelning_20241020.mp3    │
│                                         │
│ AI-INTERAKTIONER                        │
│ Totalt 5 interaktioner                  │
│ • 3 samtal (12 min total)               │
│ • 2 SMS                                 │
│                                         │
│ [Ladda ner alla dokument]               │
└─────────────────────────────────────────┘
```

---

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Cyan (#06b6d4) - Action buttons, highlights
- **Success**: Green (#10b981) - Completed, delivered, resolved
- **Warning**: Orange (#f97316) - Active, pending
- **Purple**: (#9333ea) - AI features, premium
- **Gray**: Neutral backgrounds and text

### Icons
- 📄 Brev
- 🚚 Leverans
- 📞 Samtal
- ✓ Lyckad
- 📍 Spårning
- 🤖 AI
- 📈 Statistik
- ⚙️ Inställningar

### Status Badges
```css
[Levererad] - Green background
[Skickad]   - Blue background
[Utkast]    - Gray background
[Aktiv]     - Orange background
[Löst]      - Green background
```

---

## 📱 Responsive Design

### Desktop (> 1024px)
- Sidebar alltid synlig
- Multi-column layouts
- Expanded cards med alla detaljer

### Tablet (768px - 1024px)
- Collapsible sidebar
- 2-column grids
- Kompaktare cards

### Mobile (< 768px)
- Bottom navigation
- Single column
- Stacked layouts
- Hamburger menu

---

## 🔐 Säkerhet & Privacy

### Datahantering
- All AI-kommunikation är krypterad
- Samtalsinspelningar sparas säkert
- GDPR-compliant
- User kan radera data när som helst

### Notifications
- E-post vid viktiga händelser
- Push-notiser (kan avaktiveras)
- SMS-påminnelser om betalningar
- Dashboard-notifikationer

---

## 🚀 Nästa Steg - Implementation

1. **Backend API**
   - User authentication
   - Letter CRUD operations
   - Delivery tracking integration
   - AI agent API endpoints
   - Case management

2. **Integrations**
   - Stripe (billing)
   - SendGrid (emails)
   - Twilio (SMS, calls)
   - Tracking API (PostNord, etc.)
   - OpenAI (AI generation)

3. **Frontend**
   - React components
   - State management (Redux/Context)
   - API integration
   - Real-time updates (WebSocket)
   - Responsive design

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests
   - User acceptance testing

---

## 💡 Unique Features

### AI-Brev (49 kr)
- **Juridisk matchning**: AI matchar ditt ärende mot 1000+ mallar
- **Språkkontroll**: Professionell ton och grammatik
- **Argument-generering**: Starka juridiska argument

### AI-Brev + Kurir (99 kr)
- **Guaranteed delivery**: 99% leveransgaranti
- **Real-time tracking**: Live GPS-spårning
- **Photo proof**: Bild vid leverans
- **Signature required**: Kvitterad mottagning

### Total AI-Ombud (119 kr)
- **Human-like AI**: Röst låter mänsklig
- **Context awareness**: AI minns tidigare konversationer
- **Negotiation skills**: Tränad på 10,000+ förhandlingar
- **24/7 availability**: AI jobbar dygnet runt
- **Multi-channel**: Hanterar telefon, SMS, e-post samtidigt
