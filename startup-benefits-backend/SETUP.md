# Backend Setup Guide

## Environment Configuration

Create a `.env` file in the backend root directory:

```
MONGODB_URI=mongodb://localhost:27017/startup-benefits
JWT_SECRET=your-super-secret-key-change-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Installation

```bash
npm install
```

## Running the Server

**Development Mode:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm start
```

## Database

### Local MongoDB Setup

**On Windows:**
1. Download MongoDB Community Edition
2. Install and run MongoDB service
3. Connection string: `mongodb://localhost:27017/startup-benefits`

**Using Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Seed Database with Sample Deals

Connect to MongoDB and run:

```javascript
db.deals.insertMany([
  {
    title: "AWS Startup Credits",
    description: "Up to $5,000 in AWS credits for 2 years. Perfect for hosting, storage, and compute services.",
    category: "cloud",
    partner: "Amazon Web Services",
    discount: "$5,000",
    benefit: "Free tier access plus $5,000 in additional credits",
    accessLevel: "public",
    featured: true
  },
  {
    title: "Figma Pro - 1 Year Free",
    description: "Professional design and prototyping tool for UI/UX teams.",
    category: "design",
    partner: "Figma",
    discount: "Free",
    benefit: "Full Figma Pro access including team collaboration",
    accessLevel: "public",
    featured: false
  },
  {
    title: "Stripe Processing - $500 Credit",
    description: "Payment processing platform with $500 credit for transaction fees.",
    category: "productivity",
    partner: "Stripe",
    discount: "$500",
    benefit: "Zero processing fees on first $500 in transactions",
    accessLevel: "restricted",
    featured: false,
    eligibilityRequirements: ["Active business", "Bank account verified"]
  },
  {
    title: "Segment Analytics Platform",
    description: "Customer data platform for analytics and tracking.",
    category: "analytics",
    partner: "Segment",
    discount: "$3,000/year",
    benefit: "1 year of Segment Pro access valued at $3,000",
    accessLevel: "public",
    featured: false
  },
  {
    title: "HubSpot CRM - Professional",
    description: "Complete CRM suite for sales and marketing teams.",
    category: "marketing",
    partner: "HubSpot",
    discount: "50% OFF",
    benefit: "50% discount on HubSpot Professional plan for 1 year",
    accessLevel: "public",
    featured: true
  }
])
```

## API Testing

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get All Deals:**
```bash
curl http://localhost:5000/api/deals
```

## Troubleshooting

**MongoDB Connection Error**:
- Ensure MongoDB service is running
- Check connection string in .env
- Verify port 27017 is not blocked

**CORS Error**:
- Check FRONTEND_URL in .env
- Ensure CORS middleware is configured

**Port Already in Use**:
```bash
# Change PORT in .env or kill existing process
lsof -ti:5000 | xargs kill -9
```
