/**
 * RFM (Recency, Frequency, Monetary) data interface
 * @interface RFMData
 * @property {string} id - Unique identifier for the customer
 * @property {number} recency - Days since last purchase (1-365)
 * @property {number} frequency - Number of purchases in the last year (1-50)
 * @property {number} monetary - Total amount spent in the last year (10-10000)
 */
export interface RFMData {
  id: string;
  recency: number;
  frequency: number;
  monetary: number;
}

/**
 * Generates mock RFM data for testing and development
 * @param {number} count - Number of records to generate (default: 100)
 * @returns {RFMData[]} Array of mock RFM data objects
 * 
 * @example
 * ```typescript
 * const mockData = generateMockRFMData(150);
 * console.log(mockData[0]); // { id: "CUST_001", recency: 45, frequency: 12, monetary: 1250 }
 * ```
 */
export function generateMockRFMData(count: number = 100): RFMData[] {
  const data: RFMData[] = [];
  
  for (let i = 1; i <= count; i++) {
    const id = `CUST_${i.toString().padStart(3, '0')}`;
    
    // Generate more realistic RFM values with better distribution
    const recency = Math.floor(Math.random() * 365) + 1; // 1-365 days
    const frequency = Math.floor(Math.random() * 50) + 1; // 1-50 purchases
    const monetary = Math.floor(Math.random() * 9990) + 10; // 10-10000 currency units
    
    data.push({
      id,
      recency,
      frequency,
      monetary
    });
  }
  
  // Add some variation to make data more realistic
  // Some customers with very high values (VIP customers)
  for (let i = 0; i < Math.floor(count * 0.05); i++) {
    const index = Math.floor(Math.random() * data.length);
    data[index] = {
      ...data[index],
      frequency: Math.floor(Math.random() * 20) + 30, // 30-50 purchases
      monetary: Math.floor(Math.random() * 5000) + 5000 // 5000-10000 currency units
    };
  }
  
  // Some customers with very low values (inactive customers)
  for (let i = 0; i < Math.floor(count * 0.1); i++) {
    const index = Math.floor(Math.random() * data.length);
    data[index] = {
      ...data[index],
      recency: Math.floor(Math.random() * 100) + 300, // 300-400 days
      frequency: Math.floor(Math.random() * 5) + 1, // 1-5 purchases
      monetary: Math.floor(Math.random() * 500) + 10 // 10-510 currency units
    };
  }
  
  return data;
}

/**
 * Sample RFM data for immediate testing
 * Contains 20 pre-defined records with realistic RFM values
 * @type {RFMData[]}
 */
export const sampleRFMData: RFMData[] = [
  { id: "CUST_001", recency: 15, frequency: 25, monetary: 8500 },
  { id: "CUST_002", recency: 120, frequency: 8, monetary: 3200 },
  { id: "CUST_003", recency: 45, frequency: 15, monetary: 5200 },
  { id: "CUST_004", recency: 300, frequency: 3, monetary: 800 },
  { id: "CUST_005", recency: 7, frequency: 30, monetary: 12000 },
  { id: "CUST_006", recency: 180, frequency: 5, monetary: 1500 },
  { id: "CUST_007", recency: 30, frequency: 18, monetary: 6800 },
  { id: "CUST_008", recency: 250, frequency: 2, monetary: 400 },
  { id: "CUST_009", recency: 10, frequency: 28, monetary: 9500 },
  { id: "CUST_010", recency: 90, frequency: 12, monetary: 4200 },
  { id: "CUST_011", recency: 365, frequency: 1, monetary: 100 },
  { id: "CUST_012", recency: 5, frequency: 35, monetary: 15000 },
  { id: "CUST_013", recency: 60, frequency: 10, monetary: 3800 },
  { id: "CUST_014", recency: 200, frequency: 4, monetary: 1200 },
  { id: "CUST_015", recency: 20, frequency: 22, monetary: 7800 },
  { id: "CUST_016", recency: 150, frequency: 6, monetary: 2100 },
  { id: "CUST_017", recency: 40, frequency: 16, monetary: 5500 },
  { id: "CUST_018", recency: 280, frequency: 2, monetary: 600 },
  { id: "CUST_019", recency: 12, frequency: 26, monetary: 8800 },
  { id: "CUST_020", recency: 100, frequency: 9, monetary: 3500 }
]; 