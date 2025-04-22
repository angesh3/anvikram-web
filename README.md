# Angesh Vikram – Personal Website

A modern, responsive personal website built with Next.js 14, Tailwind CSS, and enhanced with AI capabilities through OpenAI integration. Features a dynamic portfolio showcase, interactive blog platform, and seamless contact form.

## 🚀 Features

- **Modern Stack**: Built with Next.js 14, React 18, and TypeScript
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Dynamic Portfolio**: Interactive project showcase with category filtering
- **Split Design**: Innovative image transition effect with cursor interaction
- **Blog Platform**: Ready for content management with AI integration
- **Contact Form**: Interactive form with social media integration
- **AI Integration**: OpenAI-powered features for content analysis
- **Database Integration**: Supabase backend for data persistence
- **Animations**: Smooth transitions using Framer Motion
- **Docker Support**: Containerized deployment ready
- **Image Optimization**: Sharp integration for optimal performance

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Backend**: Supabase
- **AI**: OpenAI Integration
- **Development**: ESLint, TypeScript
- **Deployment**: Docker, Docker Compose
- **Image Processing**: Sharp
- **Version Control**: Git

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose
- Supabase account
- OpenAI API key

## 🚀 Getting Started

### Local Development

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

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   # Build the container
   docker-compose build

   # Start the container
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f
   ```

3. **Stop the container**
   ```bash
   docker-compose down
   ```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
anvikram-web/
├── src/
│   ├── app/                 # Next.js 14 app directory
│   │   ├── about/          # About page
│   │   ├── blog/           # Blog platform
│   │   ├── contact/        # Contact form
│   │   ├── learn/          # Learning resources
│   │   ├── portfolio/      # Portfolio showcase
│   │   └── page.tsx        # Home page with split design
│   ├── components/         # Reusable React components
│   └── lib/                # Utility functions and API clients
├── public/
│   └── images/            # Static images and assets
├── styles/                # Global styles
├── supabase/             # Supabase configurations
├── Dockerfile            # Docker configuration
└── docker-compose.yml    # Docker Compose configuration
```

## 🔄 Version History

- **v1.3**: Added split design with cursor interaction
- **v1.2**: Implemented portfolio filtering and image optimization
- **v1.1**: Added Docker support and Sharp integration
- **v1.0**: Initial release with core features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/angesh3/anvikram-web/issues).

## 📧 Contact

Angesh Vikram - [@angeshvikram](https://twitter.com/angeshvikram)

Project Link: [https://github.com/angesh3/anvikram-web](https://github.com/angesh3/anvikram-web)

# Setting up HTTPS with AWS Certificate Manager

This guide explains how to enable HTTPS for your website using AWS Certificate Manager (ACM) and Nginx.

## Prerequisites

- AWS account with ACM certificate issued for your domain
- Domain name configured in Route 53 or another DNS provider
- Docker and Docker Compose installed

## Steps to Enable HTTPS

### 1. Download ACM Certificate

The AWS Certificate Manager doesn't allow direct download of private keys for certificates. There are two options:

#### Option A: Using Load Balancer with ACM (Recommended)

1. Create an Application Load Balancer (ALB) in AWS
2. Configure the ALB to use your ACM certificate for HTTPS (port 443)
3. Point the ALB to your EC2 instance or ECS service
4. Update your DNS to point to the ALB instead of directly to your server

#### Option B: Export Certificate from ACM for Nginx

Since you can't directly export the private key from ACM, you need to:

1. Export the certificate from the AWS Console or using the AWS CLI:
   ```
   aws acm export-certificate --certificate-arn your-certificate-arn --passphrase passphrase > certificate.pem
   ```

2. Place the certificate files in the `./ssl` directory:
   - `./ssl/certificate.crt` - The certificate chain
   - `./ssl/private.key` - The private key

### 2. Configure SSL in Nginx

The `nginx.conf` and `docker-compose.production.yml` files have been updated to support HTTPS.

1. Ensure the SSL certificates are properly placed in the `./ssl` directory
2. Start your application using Docker Compose:
   ```
   docker-compose -f docker-compose.production.yml up -d
   ```

### 3. Verify HTTPS is Working

After deploying, visit your website using HTTPS (https://yourdomain.com) and verify that:
- The connection is secure
- The certificate is valid
- All HTTP requests redirect to HTTPS

## Troubleshooting

### Certificate Issues
- Make sure the certificate chain is complete and in the correct order
- Check that the private key matches the certificate

### Connection Issues
- Verify that port 443 is open in your security group/firewall
- Check Nginx logs for SSL-related errors:
  ```
  docker-compose -f docker-compose.production.yml logs nginx
  ```

## Additional Security Recommendations

1. Enable HTTP/2 for better performance
2. Set up proper HSTS headers
3. Configure secure cipher suites
4. Regularly renew your certificates before expiration
