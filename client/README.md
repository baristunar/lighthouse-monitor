# Lighthouse Monitor - Client

Modern web interface for monitoring website performance metrics using Google Lighthouse.

## 🚀 Features

- **Domain Management**: Add and manage multiple domains for monitoring
- **Manual Testing**: Run on-demand Lighthouse performance tests
- **Automated Monitoring**: View metrics from automated tests (runs every 3 hours)
- **Performance Charts**: Visualize Core Web Vitals and performance scores over time
- **Detailed Insights**: View opportunities and diagnostics to improve website performance
- **Responsive Design**: Clean, modern UI with dark theme

## 📊 Metrics Tracked

- **Performance Score**: Overall Lighthouse performance score (0-100)
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint)
  - FCP (First Contentful Paint)
  - CLS (Cumulative Layout Shift)
  - TBT (Total Blocking Time)
- **Recommendations**: Top 5 opportunities to improve performance
- **Diagnostics**: Technical issues affecting performance

## 🛠️ Tech Stack

- **React 19** - UI library with functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Recharts** - Performance charts and data visualization
- **Axios** - HTTP client for API requests
- **date-fns** - Date formatting utilities

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🎨 Project Structure

```
src/
├── components/
│   ├── AddDomainForm.tsx    # Domain management form
│   ├── ManualTest.tsx        # Manual testing interface
│   ├── MetricsView.tsx       # Metrics display and charts
│   ├── CustomSelect.tsx      # Custom dropdown component
│   ├── Header.tsx            # App header
│   ├── Footer.tsx            # App footer
│   └── Layout.tsx            # Main layout wrapper
├── services/
│   └── api.ts                # API client and endpoints
├── types/
│   └── index.ts              # TypeScript interfaces
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## 🔗 API Integration

The client connects to the backend API (default: `http://localhost:4500`):

- `GET /api/v1/domains` - Fetch all domains
- `POST /api/v1/domains` - Add new domain
- `DELETE /api/v1/domains/:id` - Remove domain
- `GET /api/v1/metrics/:domainId` - Get metrics for a domain
- `POST /api/v1/metrics/run` - Run manual Lighthouse test

## ⚙️ Environment Variables

Create a `.env` file if you need to customize the API URL:

```env
VITE_API_URL=http://localhost:4500
```

## 🎯 Key Components

### AddDomainForm
- Add new domains to monitor
- View list of existing domains
- Copy domain URLs to clipboard
- Delete domains

### ManualTest
- Select domain from dropdown
- Trigger on-demand Lighthouse tests
- Real-time test status feedback

### MetricsView
- Domain selector with custom dropdown
- Performance trend charts
- Latest metrics display
- Opportunities and diagnostics tables
- Historical data visualization

## 🎨 Styling

Custom CSS with:
- CSS Variables for theming
- Dark mode design
- Smooth animations and transitions
- Custom scrollbars
- Responsive layouts

## 📱 Responsive Design

- Desktop-first layout
- Mobile breakpoints for smaller screens
- Flexible grid system
- Touch-friendly interface

## 👤 Author

**Barış Tunar**
- Website: [baristunar.com](https://baristunar.com)
- GitHub: [@baristunar](https://github.com/baristunar)
- LinkedIn: [baristunar](https://linkedin.com/in/baristunar)

## 📄 License

This project is part of the Lighthouse Monitor full-stack application.
