# AI-Powered Sanity

A modern content management system built with Sanity Studio and designed for future frontend integration.

## Project Structure

This is a monorepo containing:

- **`/studio`** - Sanity Studio CMS with enhanced content models
- **`/web`** - _(Coming soon)_ Frontend application

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Sanity account and project

### Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/chiangs/ai-powered-sanity.git
   cd ai-powered-sanity
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install studio dependencies
   cd studio
   npm install
   ```

3. **Start the Sanity Studio**
   ```bash
   cd studio
   npm run dev
   ```

## Content Model

The Sanity Studio includes the following content types:

- **Post** - Blog posts and articles with SEO optimization
- **Person** - Authors, contributors, and team members
- **Category** - Content categorization with color themes
- **Location** - Physical locations with contact details and geo-coordinates
- **Block Content** - Rich text content with images and formatting

## Features

- 🎨 **Enhanced Content Types** - Comprehensive schema with validation and preview
- 🏗️ **Structured Content** - Well-organized fields with groups and fieldsets
- 🔍 **SEO Optimized** - Built-in meta fields and social sharing
- 📱 **Responsive Preview** - Rich document previews with status indicators
- 🎯 **Validation Rules** - Content quality enforcement with helpful error messages
- 📍 **Location Support** - Geographic data with contact information
- 👥 **Team Management** - Person profiles with social links and bios

## Content Guidelines

This project follows opinionated Sanity development practices:

- Schema types use `defineType`, `defineField`, and `defineArrayMember` helpers
- All schema types have icons, previews, and proper validation
- Content is modeled for what things are, not how they look
- Consistent field ordering from most to least important
- Proper use of groups and fieldsets for better UX

## Scripts

```bash
# Root level
npm run studio:dev    # Start Sanity Studio
npm run studio:build  # Build Studio for production

# In studio directory
npm run dev          # Start development server
npm run build        # Build for production
npm run deploy       # Deploy to Sanity hosting
```

## Contributing

1. Follow the content modeling guidelines in `studio/.rules-sanity-opinionated.md`
2. Use conventional commit messages
3. Test schema changes with placeholder content
4. Run TypeScript checks before committing

## License

MIT