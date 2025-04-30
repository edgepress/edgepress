# EdgePress

<div align="center">
  <img src="https://via.placeholder.com/200x200?text=EdgePress" alt="EdgePress Logo" width="200"/>
  <p>A modern, collaborative content management system for the edge.</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

## Overview

EdgePress is a modern content management system built for edge computing, featuring both admin and user-facing interfaces. It enables real-time collaborative editing and publishing of content with a clean, responsive UI.

## Features

- **Dual Interfaces**
  - Admin dashboard (admin.edgepress.org) for content and site management
  - User portal (app.edgepress.org) for content creators

- **Rich Content Editing**
  - BlockNote rich text editor with collaborative editing
  - File and image management
  - Category and tag organization

- **Modern Architecture**
  - Edge-first deployment
  - Real-time collaboration
  - Responsive design for all devices

## Tech Stack

- **Frontend**
  - Next.js (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI components
  - BlockNote editor

- **Backend**
  - Vercel Edge Functions
  - Real-time collaboration via Ember Link

- **Developer Experience**
  - pnpm workspaces for monorepo management
  - Turborepo for build orchestration

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/edgepress.git
cd edgepress

# Install dependencies
pnpm install
```

### Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build
```

The development server will be available at:
- Admin interface: http://localhost:3000/admin.edgepress.org
- User interface: http://localhost:3000/app.edgepress.org

## Project Structure

```
edgepress/
├── apps/
│   ├── web/                     # Main Next.js application
│   │   ├── app/                 # App router
│   │   │   ├── admin.edgepress.org/  # Admin interface
│   │   │   └── app.edgepress.org/    # User interface
│   │   ├── components/          # Shared components
│   │   └── public/              # Static assets
│   └── ...                      # Other applications
├── packages/                    # Shared packages
│   ├── ui/                      # UI components
│   └── ...                      # Other packages
└── ...
```

## Deployment

EdgePress is designed to be deployed on Vercel:

```bash
# Deploy to Vercel
vercel
```

For other platforms, build the project and deploy the output:

```bash
pnpm build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
