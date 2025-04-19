# Angesh Vikram – Personal Website

A modern, responsive personal website built with Next.js 14, Tailwind CSS, and enhanced with AI capabilities through OpenAI integration. Features a portfolio showcase, blog platform, and interactive contact form.

## 🚀 Features

- **Modern Stack**: Built with Next.js 14, React 18, and TypeScript
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Portfolio Showcase**: Interactive project cards with filtering capabilities
- **Blog Platform**: Ready for content management
- **Contact Form**: Interactive form with social media integration
- **AI Integration**: OpenAI-powered features for content analysis
- **Database Integration**: Supabase backend for data persistence
- **Animations**: Smooth transitions using Framer Motion

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Backend**: Supabase
- **AI**: OpenAI Integration
- **Development**: ESLint, TypeScript

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- OpenAI API key

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/angesh3/anvikram-web.git
   cd anvikram-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
anvikram-web/
├── src/
│   ├── app/                 # Next.js 14 app directory
│   ├── components/          # Reusable React components
│   └── lib/                 # Utility functions and API clients
├── public/                  # Static assets
├── styles/                  # Global styles
└── supabase/               # Supabase configurations
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the migrations in `supabase/migrations`
3. Update environment variables

### OpenAI Setup
1. Obtain an API key from OpenAI
2. Add the key to your environment variables

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update global styles in `src/app/globals.css`

### Content
- Update portfolio projects in `src/app/portfolio/page.tsx`
- Modify contact information in `src/app/contact/page.tsx`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Angesh Vikram**
- LinkedIn: [Angesh Vikram](https://linkedin.com/in/angeshvikram)
- GitHub: [@angesh3](https://github.com/angesh3)
- Twitter: [@angeshvikram](https://twitter.com/angeshvikram)
