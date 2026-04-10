# Miller's Screen Website

## Project Structure
- Next.js 14 app with TypeScript
- Tailwind CSS for styling
- Located in Volusia County, Florida

## Key Files
- `lib/team.ts` - Team member data
- `lib/projects.ts` - Project/gallery data  
- `lib/seo.ts` - SEO metadata and FAQs
- `components/header.tsx` - Navigation
- `app/[city]/[service]/page.tsx` - Dynamic service pages

## Common Tasks
- Adding new team members: Edit `lib/team.ts`
- Adding new projects: Edit `lib/projects.ts`
- Adding new services: Edit header, footer, and dynamic page config

## Deployment
- GitHub → Railway (auto-deploys)