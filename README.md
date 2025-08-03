# RFM Customer Segmentation Interface

A modern React/Next.js application for analyzing customer segments using RFM (Recency, Frequency, Monetary) analysis with an interactive 5x5 grid visualization.

## Project Overview

This application provides a comprehensive RFM analysis interface that allows users to:
- Generate mock customer data (100+ records)
- Visualize customer segments in a 5x5 grid
- Filter customers by RFM scores
- Select and submit customer IDs to API endpoints
- Real-time data analysis and visualization

## Features

### RFM Analysis
- **Recency**: Days since last purchase (1-365 days)
- **Frequency**: Number of purchases in last year (1-50)
- **Monetary**: Total amount spent in last year (10-15000)
- **Percentile-based scoring**: Automatic 1-5 score calculation
- **Grid coordinates**: X = Frequency score, Y = Monetary score

### Interactive Interface
- **5x5 Grid Visualization**: Color-coded customer density
- **Real-time Filtering**: Slider-based RFM score filtering
- **Selection System**: Click to select grid cells
- **API Integration**: Submit selected IDs to backend
- **Responsive Design**: Mobile-friendly interface
- **Dark/Light Mode**: Automatic theme switching

### Technical Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **API**: RESTful endpoints with validation

## Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rfm_segmentation
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
yarn build
yarn start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── selected-ids/
│   │       └── route.ts          # API endpoint
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Main application page
├── components/
│   ├── Providers.tsx             # React Query provider
│   ├── RFMGrid.tsx              # 5x5 grid component
│   └── RFMFilters.tsx           # Filter controls
├── hooks/
│   └── useRfmApi.ts             # React Query hooks
├── lib/
│   └── api.ts                   # Axios client & API functions
└── utils/
    ├── mockData.ts              # Data generation utilities
    └── rfmCalculator.ts         # RFM scoring algorithms
```

## Usage Guide

### 1. Data Generation
- Click "Generate 100 Records" for minimum requirement
- Use "Generate 200 Records" or "Generate 500 Records" for larger datasets
- Data is automatically calculated with RFM scores

### 2. Grid Interaction
- **View**: 5x5 grid shows customer distribution
- **Colors**: Intensity indicates customer count per cell
- **Selection**: Click cells to select customers
- **Coordinates**: F1-M1 (bottom-left) to F5-M5 (top-right)

### 3. Filtering
- **Recency Slider**: Filter by minimum recency score (1-5)
- **Frequency Slider**: Filter by minimum frequency score (1-5)
- **Monetary Slider**: Filter by minimum monetary score (1-5)
- **Reset Filters**: Clear all filter criteria

### 4. API Submission
- **Select Customers**: Click grid cells to select customers
- **Submit IDs**: Click "Submit Selected IDs" button
- **View Response**: API response displayed below

## API Endpoints

### POST /api/selected-ids
Submit selected customer IDs for processing.

**Request Body:**
```json
{
  "selectedIds": ["CUST_001", "CUST_002", "CUST_003"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully processed 3 selected customer(s)",
  "count": 3,
  "selectedIds": ["CUST_001", "CUST_002", "CUST_003"]
}
```

### GET /api/selected-ids
Get API endpoint information.

## Data Format

### Customer Record
```json
{
  "id": "CUST_001",
  "recency": 15,      // Days since last purchase
  "frequency": 25,     // Number of purchases
  "monetary": 8500     // Total amount spent
}
```

### RFM Scoring
- **Recency**: 1 (best) to 5 (worst) - Lower days = better
- **Frequency**: 1 (worst) to 5 (best) - Higher purchases = better  
- **Monetary**: 1 (worst) to 5 (best) - Higher amount = better

## Development

### Code Quality
- **ESLint**: Configured for TypeScript and Next.js
- **TypeScript**: Strict type checking enabled
- **JSDoc**: Comprehensive documentation
- **Prettier**: Code formatting

### Testing
```bash
# Run linting
yarn lint

# Build check
yarn build

# Type checking
yarn type-check
```

## Performance Features

- **React Query**: Automatic caching and background updates
- **Optimized Build**: Next.js production optimization
- **Lazy Loading**: Component-based code splitting
- **Responsive Design**: Mobile-first approach

## UI/UX Features

- **Modern Design**: Clean, professional interface
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading States**: Visual feedback for API calls
- **Error Handling**: User-friendly error messages
- **Dark Mode**: Automatic theme detection

## Technical Requirements Met

- **5x5 Grid Interface**: Interactive customer segmentation grid  
- **RFM Filtering**: Real-time filtering by R, F, M scores  
- **Selection System**: Click-to-select functionality  
- **API Integration**: POST /api/selected-ids endpoint  
- **100+ Records**: Minimum data requirement exceeded  
- **Modern Stack**: Next.js, React, TypeScript  
- **Clean Architecture**: Component-based structure  
- **Documentation**: Comprehensive JSDoc comments  

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

**Built with Next.js, React, and TypeScript**
