# Frontend Setup Guide

## Environment Configuration

Create a `.env.local` file in the frontend root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Installation

```bash
npm install
```

## Running the Development Server

```bash
npm run dev
```

Access the application at `http://localhost:3000`

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── page.tsx              # Landing page
├── layout.tsx            # Root layout
├── globals.css           # Global styles
├── auth/
│   ├── login/page.tsx    # Login page
│   └── register/page.tsx # Registration page
├── deals/
│   ├── page.tsx          # Deals listing
│   └── [id]/page.tsx     # Deal details
└── dashboard/
    └── page.tsx          # User dashboard

components/
├── Navigation.tsx        # Navigation bar
└── Footer.tsx           # Footer

hooks/
└── useAuth.ts           # Authentication hook

lib/
├── api.ts               # API client
└── auth.ts              # Auth utilities

types/
└── index.ts             # TypeScript types
```

## Key Features Implemented

### 1. Landing Page (`/`)
- Animated hero section with scroll effects
- Feature showcase with hover animations
- Call-to-action buttons
- Smooth page transitions

### 2. Authentication
- Registration with validation (`/auth/register`)
- Secure login (`/auth/login`)
- JWT token management
- Protected routes

### 3. Deal Browsing (`/deals`)
- Category filtering
- Search functionality
- Deal cards with animations
- Smooth load states

### 4. Deal Details (`/deals/:id`)
- Full deal information
- Eligibility requirements
- Claim button with auth redirect
- Status tracking

### 5. Dashboard (`/dashboard`)
- User profile section
- Edit profile functionality
- Claimed deals tracking
- Status indicators

## Styling

The project uses Tailwind CSS with custom animations:

```css
/* Animations defined in globals.css */
@keyframes float { ... }
@keyframes gradientShift { ... }

/* Tailwind animations */
animate-fade-in
animate-slide-up
animate-bounce-subtle
```

## Performance Optimization

- Code splitting by routes
- Image optimization
- Debounced search (300ms)
- Lazy component loading
- Skeleton loading screens

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

**API Connection Error**:
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env.local
- Verify CORS is enabled on backend

**Build Error**:
```bash
rm -rf node_modules .next
npm install
npm run build
```

**Port Already in Use**:
```bash
# Port 3000 is in use, change it
npm run dev -- -p 3001
```

## Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
4. Deploy automatically on push

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t startup-benefits-frontend .
docker run -p 3000:3000 startup-benefits-frontend
```
