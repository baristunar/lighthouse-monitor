# 🚀 Lighthouse Monitor

Full-stack web performance monitoring application that automatically tracks website performance metrics using Google Lighthouse. Monitor Core Web Vitals, performance scores, and receive actionable insights to improve user experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![React](https://img.shields.io/badge/React-19.x-61dafb.svg)

## ✨ Features

### 🎯 Core Functionality
- **Automated Testing**: Lighthouse tests run every 3 hours automatically
- **Manual Testing**: Trigger on-demand performance tests
- **Multiple Domains**: Monitor unlimited websites
- **Historical Data**: Track performance trends over time
- **Visual Analytics**: Interactive charts for performance metrics

### 📊 Metrics & Insights
- **Performance Score**: Overall Lighthouse score (0-100)
- **Core Web Vitals**: LCP, FCP, CLS, TBT
- **Opportunities**: Top 5 recommendations to improve performance
- **Diagnostics**: Technical issues affecting site performance
- **Trend Analysis**: Performance changes over time

### 🎨 User Experience
- Modern, responsive dark theme UI
- Real-time test status updates
- Copy-to-clipboard functionality
- Custom dropdown components
- Smooth animations and transitions

## 🏗️ Architecture

```
lighthouse-monitor/
├── backend/          # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/           # Configuration management
│   │   ├── database/         # MongoDB connection
│   │   ├── lighthouse/       # Lighthouse service
│   │   ├── cron/             # Scheduled tasks
│   │   └── modules/
│   │       ├── domains/      # Domain management
│   │       └── metrics/      # Metrics collection
│   └── package.json
│
└── client/           # React + TypeScript + Vite
    ├── src/
    │   ├── components/       # React components
    │   ├── services/         # API client
    │   └── types/            # TypeScript interfaces
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript with ES Modules
- **Automation**: node-cron for scheduled tasks
- **Performance Testing**: Google Lighthouse CLI
- **HTTP Logging**: Morgan

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Date Utilities**: date-fns

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Clone Repository
```bash
git clone https://github.com/baristunar/lighthouse-monitor.git
cd lighthouse-monitor
```

### Backend Setup
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=4500
MONGO_URI=your_mongodb_connection_string
EOF

# Start development server
npm run dev
```

### Frontend Setup
```bash
cd client
npm install

# Start development server
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4500`

## 🚀 Usage

### 1. Add a Domain
- Enter the website URL in the "Add Domain" form
- Click "Add Domain" to start monitoring

### 2. Manual Testing
- Select a domain from the dropdown
- Click "Run Test" to trigger an immediate Lighthouse test
- View results in the metrics section

### 3. View Metrics
- Select a domain to view its performance history
- Analyze trends with interactive charts
- Review opportunities and diagnostics for improvements

### 4. Automated Monitoring
- Tests automatically run every 3 hours
- View historical data and performance trends
- Track improvements over time

## 📊 API Endpoints

### Domains
- `GET /api/v1/domains` - Get all monitored domains
- `POST /api/v1/domains` - Add new domain
- `DELETE /api/v1/domains/:id` - Remove domain

### Metrics
- `GET /api/v1/metrics/:domainId` - Get metrics for a domain
- `POST /api/v1/metrics/run` - Run manual Lighthouse test

## ⚙️ Configuration

### Backend Environment Variables
```env
PORT=4500                           # API server port
MONGO_URI=mongodb+srv://...        # MongoDB connection string
```

### Frontend Environment Variables (optional)
```env
VITE_API_URL=http://localhost:4500  # Backend API URL
```

## 🔧 Development

### Backend
```bash
cd backend
npm run dev      # Start with hot reload
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

### Frontend
```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📝 Scripts

### Backend Scripts
- `dev` - Start development server with tsx watch
- `build` - Compile TypeScript to JavaScript
- `start` - Run production server
- `lint` - Check code quality
- `lint:fix` - Fix linting issues
- `format` - Format code with Prettier

### Frontend Scripts
- `dev` - Start Vite dev server
- `build` - Build for production
- `lint` - Run ESLint
- `preview` - Preview production build

## 🎯 Key Features Explained

### Automated Cron Jobs
The backend runs Lighthouse tests every 3 hours using node-cron. Results are automatically saved to MongoDB with timestamps for trend analysis.

### Custom Components
- **CustomSelect**: Accessible dropdown with keyboard navigation
- **AddDomainForm**: Domain management with copy-to-clipboard
- **MetricsView**: Performance visualization with Recharts
- **ManualTest**: On-demand testing interface

### Performance Optimization
- Component-based architecture
- Efficient re-rendering with React keys
- Optimized database queries with Mongoose
- Responsive design for all devices

## 🔒 Security

- CORS enabled for frontend-backend communication
- Environment variables for sensitive data
- Input validation on all API endpoints
- MongoDB connection with authentication

## 📈 Performance Metrics

Track these key metrics:
- **Performance Score** (0-100)
- **LCP**: Largest Contentful Paint
- **FCP**: First Contentful Paint
- **CLS**: Cumulative Layout Shift
- **TBT**: Total Blocking Time

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Barış Tunar**
- Website: [baristunar.com](https://baristunar.com)
- GitHub: [@baristunar](https://github.com/baristunar)
- LinkedIn: [baristunar](https://linkedin.com/in/baristunar)

## 🙏 Acknowledgments

- Google Lighthouse for performance testing
- MongoDB Atlas for database hosting
- Recharts for data visualization
- React and Vite communities

