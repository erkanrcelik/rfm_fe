import { RFMData } from './mockData';

/**
 * RFM score interface representing calculated scores for each dimension
 * @interface RFMScore
 * @property {string} id - Customer identifier
 * @property {number} recencyScore - Recency score (1-5, where 1 is best)
 * @property {number} frequencyScore - Frequency score (1-5, where 5 is best)
 * @property {number} monetaryScore - Monetary score (1-5, where 5 is best)
 * @property {number} x - X coordinate for grid (frequency score)
 * @property {number} y - Y coordinate for grid (monetary score)
 */
export interface RFMScore {
  id: string;
  recencyScore: number;
  frequencyScore: number;
  monetaryScore: number;
  x: number;
  y: number;
}

/**
 * Calculates percentile rank for a given value within an array
 * @param {number} value - The value to calculate percentile for
 * @param {number[]} array - Array of values to calculate percentile against
 * @returns {number} Percentile rank (0-1)
 * 
 * @example
 * ```typescript
 * const values = [10, 20, 30, 40, 50];
 * const percentile = calculatePercentile(25, values); // 0.6
 * ```
 */
function calculatePercentile(value: number, array: number[]): number {
  const sortedArray = [...array].sort((a, b) => a - b);
  const index = sortedArray.findIndex(item => item >= value);
  
  if (index === -1) return 1;
  if (index === 0) return 0;
  
  return index / (sortedArray.length - 1);
}

/**
 * Converts percentile rank to RFM score (1-5)
 * @param {number} percentile - Percentile rank (0-1)
 * @param {boolean} isRecency - Whether this is for recency calculation (inverted scoring)
 * @returns {number} RFM score (1-5)
 * 
 * @example
 * ```typescript
 * const score = percentileToScore(0.8, false); // 4
 * const recencyScore = percentileToScore(0.2, true); // 4 (inverted)
 * ```
 */
function percentileToScore(percentile: number, isRecency: boolean = false): number {
  let score: number;
  
  if (percentile <= 0.2) score = 1;
  else if (percentile <= 0.4) score = 2;
  else if (percentile <= 0.6) score = 3;
  else if (percentile <= 0.8) score = 4;
  else score = 5;
  
  // For recency, lower values are better, so we invert the score
  return isRecency ? (6 - score) : score;
}

/**
 * Calculates RFM scores and grid coordinates for a dataset
 * @param {RFMData[]} data - Array of RFM data objects
 * @returns {RFMScore[]} Array of calculated RFM scores with grid coordinates
 * 
 * @example
 * ```typescript
 * const rfmData = generateMockRFMData(100);
 * const scores = calculateRFMScores(rfmData);
 * console.log(scores[0]); // { id: "CUST_001", recencyScore: 4, frequencyScore: 3, monetaryScore: 4, x: 3, y: 4 }
 * ```
 */
export function calculateRFMScores(data: RFMData[]): RFMScore[] {
  // Extract arrays for percentile calculation
  const recencyValues = data.map(item => item.recency);
  const frequencyValues = data.map(item => item.frequency);
  const monetaryValues = data.map(item => item.monetary);
  
  return data.map(item => {
    // Calculate percentiles
    const recencyPercentile = calculatePercentile(item.recency, recencyValues);
    const frequencyPercentile = calculatePercentile(item.frequency, frequencyValues);
    const monetaryPercentile = calculatePercentile(item.monetary, monetaryValues);
    
    // Convert to scores
    const recencyScore = percentileToScore(recencyPercentile, true);
    const frequencyScore = percentileToScore(frequencyPercentile, false);
    const monetaryScore = percentileToScore(monetaryPercentile, false);
    
    return {
      id: item.id,
      recencyScore,
      frequencyScore,
      monetaryScore,
      x: frequencyScore, // X coordinate is frequency score
      y: monetaryScore   // Y coordinate is monetary score
    };
  });
}

/**
 * Filters RFM scores based on recency, frequency, and monetary criteria
 * @param {RFMScore[]} scores - Array of RFM scores to filter
 * @param {Object} filters - Filter criteria
 * @param {number} filters.recency - Minimum recency score (1-5)
 * @param {number} filters.frequency - Minimum frequency score (1-5)
 * @param {number} filters.monetary - Minimum monetary score (1-5)
 * @returns {RFMScore[]} Filtered array of RFM scores
 * 
 * @example
 * ```typescript
 * const filtered = filterRFMScores(scores, { recency: 3, frequency: 2, monetary: 4 });
 * ```
 */
export function filterRFMScores(
  scores: RFMScore[], 
  filters: { recency?: number; frequency?: number; monetary?: number }
): RFMScore[] {
  return scores.filter(score => {
    if (filters.recency && score.recencyScore < filters.recency) return false;
    if (filters.frequency && score.frequencyScore < filters.frequency) return false;
    if (filters.monetary && score.monetaryScore < filters.monetary) return false;
    return true;
  });
}

/**
 * Gets grid cell data for a 5x5 grid based on RFM scores
 * @param {RFMScore[]} scores - Array of RFM scores
 * @returns {Object} Grid data with counts and items for each cell
 * 
 * @example
 * ```typescript
 * const gridData = getGridData(scores);
 * console.log(gridData['3-4']); // { count: 5, items: [...] }
 * ```
 */
export function getGridData(scores: RFMScore[]) {
  const grid: Record<string, { count: number; items: RFMScore[] }> = {};
  
  // Initialize 5x5 grid
  for (let x = 1; x <= 5; x++) {
    for (let y = 1; y <= 5; y++) {
      const key = `${x}-${y}`;
      grid[key] = { count: 0, items: [] };
    }
  }
  
  // Populate grid with scores
  scores.forEach(score => {
    const key = `${score.x}-${score.y}`;
    if (grid[key]) {
      grid[key].count++;
      grid[key].items.push(score);
    }
  });
  
  return grid;
} 