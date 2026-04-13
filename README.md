# Miller's Screen Website

Premium screen enclosure contractor website for Volusia County, Florida.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Supabase
- **Deployment**: Railway

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required environment variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `ABACUSAI_API_KEY` | Abacus AI API key for chatbot |
| `WEB_APP_ID` | Abacus AI web app ID |
| `NOTIF_ID_LEAD_FORM_SUBMISSION` | Notification ID for lead emails |
| `NOTIF_ID_EMAIL_SIGNUP_10_OFF` | Notification ID for email signup |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics measurement ID |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `ADMIN_SECRET` | Admin dashboard secret |
| `NEXTAUTH_SECRET` | NextAuth session secret |

### Installation

```bash
npm install
```

### Database Setup

Supabase handles database migrations. Ensure your Supabase project is running and the connection variables are set in `.env`.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Deployment

Deploy via Railway or similar platform:

1. Connect your GitHub repository
2. Configure the following:

| Setting | Value |
|---------|-------|
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Node Version** | 18 |

3. Add environment variables from `.env.example`

### Database

Supabase PostgreSQL - copy the connection string to `DATABASE_URL`.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── [city]/[service]/ # Dynamic service area pages
│   └── *.tsx             # Static pages
├── components/            # React components
├── lib/                   # Utility functions and Supabase client
├── public/                # Static assets
└── scripts/               # Build scripts
```

## License

Private - All rights reserved
