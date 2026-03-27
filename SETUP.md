# VINAYAGA CONSTRUCTION — COMPLETE SETUP GUIDE
## Full-Stack Web Application by AZHAGAR, Civil Engineer

---

## PROJECT STRUCTURE

```
vinayaga-construction/
├── frontend/                          # Next.js 14 App
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.jsx             # Root layout (Navbar, Footer, WhatsApp)
│   │   │   ├── page.jsx               # Home page
│   │   │   ├── about/page.jsx         # About page
│   │   │   ├── services/page.jsx      # Services page
│   │   │   ├── contact/page.jsx       # Contact + Enquiry form
│   │   │   └── admin/
│   │   │       ├── login/page.jsx     # Admin login
│   │   │       └── dashboard/page.jsx # Admin dashboard
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx         # Responsive navbar
│   │   │   │   └── Footer.jsx         # Footer
│   │   │   └── ui/
│   │   │       └── WhatsAppButton.jsx  # Floating WhatsApp
│   │   └── app/globals.css            # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── .env.local.example
│
├── backend/                           # Node.js + Express API
│   ├── server.js                      # Entry point
│   ├── models/
│   │   ├── Enquiry.js                 # Enquiry schema
│   │   └── Admin.js                   # Admin schema (with bcrypt)
│   ├── routes/
│   │   ├── enquiry.js                 # POST/GET/PATCH/DELETE /api/enquiry
│   │   └── auth.js                    # POST /api/auth/login
│   ├── middleware/
│   │   └── auth.js                    # JWT verification middleware
│   ├── package.json
│   └── .env.example
│
└── SETUP.md                           # This file
```

---

## STEP 1 — MONGODB ATLAS SETUP

1. Go to https://cloud.mongodb.com and sign up
2. Create a FREE cluster (M0 Sandbox)
3. Create a database user:
   - Username: vinayaga_user
   - Password: (strong password)
4. Whitelist IP: 0.0.0.0/0 (allow all for now)
5. Click "Connect" → "Connect your application"
6. Copy the connection string:
   mongodb+srv://vinayaga_user:<password>@cluster0.xxxxx.mongodb.net/vinayaga_construction

---

## STEP 2 — BACKEND SETUP (Local)

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://vinayaga_user:<password>@cluster0.xxxxx.mongodb.net/vinayaga_construction
JWT_SECRET=VinayagaSecretKey2024_ChangeThis!
FRONTEND_URL=http://localhost:3000
ADMIN_PASSWORD=Vinayaga@2024
```

Start backend:
```bash
npm run dev
```

**Create admin account (ONE TIME ONLY):**
```bash
curl -X POST http://localhost:5000/api/auth/setup
```
This creates: username=admin, password=Vinayaga@2024

---

## STEP 3 — FRONTEND SETUP (Local)

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WHATSAPP_NUMBER=919092642503
```

Start frontend:
```bash
npm run dev
```

Open: http://localhost:3000

---

## STEP 4 — API TESTING GUIDE

### Submit Enquiry (Public)
```bash
curl -X POST http://localhost:5000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "9876543210",
    "email": "test@example.com",
    "serviceType": "Residential Construction",
    "message": "I want to build a house"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "Vinayaga@2024"}'
```
Copy the `token` from response.

### Get All Enquiries (Admin)
```bash
curl http://localhost:5000/api/enquiry \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

### Update Enquiry Status
```bash
curl -X PATCH http://localhost:5000/api/enquiry/<ENQUIRY_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"status": "contacted"}'
```

### Delete Enquiry
```bash
curl -X DELETE http://localhost:5000/api/enquiry/<ENQUIRY_ID> \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

---

## STEP 5 — DEPLOYMENT

### Backend → Render.com (FREE)

1. Push backend folder to a GitHub repository
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add Environment Variables (same as .env):
   - MONGODB_URI
   - JWT_SECRET
   - FRONTEND_URL (your Vercel URL)
   - ADMIN_PASSWORD
6. Deploy. Note your Render URL: https://your-api.onrender.com

### Frontend → Vercel (FREE)

1. Push frontend folder to a GitHub repository
2. Go to https://vercel.com → New Project
3. Import your frontend repo
4. Add Environment Variables:
   - NEXT_PUBLIC_API_URL = https://your-api.onrender.com
5. Deploy. Your site will be live at: https://your-site.vercel.app

### After Deployment — Create Admin
```bash
curl -X POST https://your-api.onrender.com/api/auth/setup
```

---

## STEP 6 — ADMIN PANEL ACCESS

1. Visit: https://your-site.vercel.app/admin/login
2. Username: admin
3. Password: Vinayaga@2024
4. IMPORTANT: Change the password after first login

### Admin Dashboard Features:
- View all enquiries with full details
- Filter by status: New / Contacted / Closed
- Mark enquiry as "Contacted" with one click
- Close resolved enquiries
- Delete enquiries permanently
- Auto-refresh data

---

## PAGES OVERVIEW

| Route               | Description                        |
|---------------------|------------------------------------|
| /                   | Home — Hero, Services, Testimonials|
| /about              | About Azhagar, Company Story       |
| /services           | Detailed 5 service descriptions    |
| /contact            | Enquiry form + Map + Details       |
| /admin/login        | Admin authentication               |
| /admin/dashboard    | Full enquiry management panel      |

---

## WHATSAPP INTEGRATION

The floating WhatsApp button is in:
`frontend/src/components/ui/WhatsAppButton.jsx`

On click it opens:
```
https://wa.me/919092642503?text=Hello%2C%20I%20am%20interested%20in%20your%20construction%20services
```

To change the number, edit: `NEXT_PUBLIC_WHATSAPP_NUMBER` in .env.local

---

## SECURITY NOTES

1. Change JWT_SECRET to a random 64-char string in production
2. Change ADMIN_PASSWORD immediately after first login
3. Add rate limiting (already configured — 100 req/15min)
4. Enable MongoDB Atlas IP whitelist for production IPs
5. Use HTTPS in production (automatic with Vercel + Render)

---

## TECH STACK SUMMARY

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | Next.js 14 (App Router)       |
| Styling    | Tailwind CSS                  |
| Animations | CSS + Intersection Observer   |
| Fonts      | Bebas Neue + DM Sans (Google) |
| Backend    | Node.js + Express             |
| Database   | MongoDB Atlas (Mongoose)      |
| Auth       | JWT + bcryptjs                |
| Hosting    | Vercel + Render               |
| WhatsApp   | wa.me API                     |

---

## SUPPORT

Owner: AZHAGAR (Civil Engineer)
Email: vinayagaconstruction2024@gmail.com
Phone: +91 9092642503
Address: 19/13 Karapaga Vinayagar Kovil Street, Ekkattuthangal, Chennai - 600032
