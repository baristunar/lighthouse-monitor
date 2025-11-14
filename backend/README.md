# 🚀 Lighthouse Monitor Backend

A powerful web performance monitoring API that automatically tracks and analyzes website metrics using Google Lighthouse. Built with TypeScript, Node.js, Express, and MongoDB.

## ✨ Features

- 📊 **Automated Performance Monitoring** - Schedule periodic Lighthouse audits with cron jobs (every 3 hours)
- 🎯 **Core Web Vitals Tracking** - Monitor LCP, FCP, CLS, TBT, and overall performance scores
- 💡 **Performance Recommendations** - Capture and store top 5 Lighthouse optimization opportunities and diagnostics
- 🗄️ **Historical Data** - Track performance metrics over time with MongoDB
- 🔄 **RESTful API** - Clean endpoints for domain management and metric analysis
- ⚡ **On-Demand Analysis** - Run Lighthouse tests instantly for any domain
- 🛡️ **Error Handling** - Comprehensive error handling and file cleanup

## 🛠️ Tech Stack

- **Runtime**: Node.js v22+
- **Language**: TypeScript 5.x
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Task Scheduling**: node-cron
- **Performance Analysis**: Google Lighthouse CLI (headless Chrome)
- **Development**: tsx (fast TypeScript execution)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/baristunar/lighthouse-monitor.git

# Navigate to backend
cd lighthouse-monitor/backend

# Install dependencies
yarn install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## 🔧 Environment Variables

```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/?appName=Lighthouse
PORT=4500
```

## 📡 API Endpoints

### Health Check
- `GET /health` - API health status
- `GET /` - API root

### Domains
- `GET /api/v1/domains` - List all monitored domains
- `POST /api/v1/domains` - Add a new domain to monitor
  ```json
  {
    "url": "https://example.com"
  }
  ```

### Metrics
- `GET /api/v1/metrics/:domain` - Get performance history for a specific domain
- `POST /api/v1/metrics/run` - Run Lighthouse test on-demand
  ```json
  {
    "domain": "https://example.com"
  }
  ```

## 📊 Metrics Response Structure

```json
{
  "domain": "https://example.com",
  "performance": 85,
  "lcp": 2500,
  "fcp": 1800,
  "cls": 0.1,
  "tbt": 300,
  "opportunities": [
    {
      "auditId": "unused-javascript",
      "title": "Remove unused JavaScript",
      "description": "Reduce unused JavaScript and defer loading...",
      "score": 0.45,
      "displayValue": "Potential savings of 125 KB",
      "numericValue": 1250,
      "numericUnit": "millisecond"
    }
  ],
  "diagnostics": [
    {
      "auditId": "uses-text-compression",
      "title": "Enable text compression",
      "description": "Text-based resources should be served with compression...",
      "score": 0.6,
      "displayValue": "Potential savings of 45 KB"
    }
  ],
  "created_at": "2025-11-14T12:00:00.000Z"
}
```

## 📊 Tracked Metrics

| Metric | Description | Unit |
|--------|-------------|------|
| **Performance Score** | Overall Lighthouse performance score | 0-100 |
| **LCP** | Largest Contentful Paint | milliseconds |
| **FCP** | First Contentful Paint | milliseconds |
| **CLS** | Cumulative Layout Shift | score |
| **TBT** | Total Blocking Time | milliseconds |
| **Opportunities** | Top 5 performance improvements | array |
| **Diagnostics** | Top 5 diagnostic insights | array |

## ⏰ Automated Monitoring

The cron job runs every 3 hours and automatically:
1. Fetches all registered domains from MongoDB
2. Runs Lighthouse tests on each domain
3. Stores results with opportunities and diagnostics
4. Cleans up temporary report files

Schedule: `0 */3 * * *` (every 3 hours)

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   └── index.ts           # Environment config
│   ├── cron/
│   │   └── lighthouse.cron.ts # Scheduled tasks
│   ├── database/
│   │   └── db.ts              # MongoDB connection
│   ├── lighthouse/
│   │   ├── lighthouse.service.ts  # Lighthouse runner
│   │   └── lighthouse.types.ts
│   └── modules/
│       ├── domains/           # Domain management
│       │   ├── domain.controller.ts
│       │   ├── domain.model.ts
│       │   ├── domain.repository.ts
│       │   ├── domain.service.ts
│       │   └── domain.types.ts
│       └── metrics/           # Metrics management
│           ├── metrics.controller.ts
│           ├── metrics.model.ts
│           ├── metrics.repository.ts
│           ├── metrics.service.ts
│           └── metrics.types.ts
├── package.json
├── tsconfig.json
└── .eslintrc.json
```

## 🚀 Scripts

```bash
yarn dev         # Start development server with tsx watch
yarn build       # Compile TypeScript to JavaScript
yarn start       # Run production build
yarn lint        # Run ESLint
yarn lint:fix    # Fix ESLint errors
yarn format      # Format code with Prettier
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT

## 👤 Author

**Barış Tunar**
- GitHub: [@baristunar](https://github.com/baristunar)

---

Made with ❤️ and ☕