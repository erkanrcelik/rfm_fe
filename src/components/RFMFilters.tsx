'use client';

import React from 'react';

/**
 * Filter criteria interface for RFM analysis
 * @interface RFMFilters
 * @property {number} recency - Minimum recency score (1-5)
 * @property {number} frequency - Minimum frequency score (1-5)
 * @property {number} monetary - Minimum monetary score (1-5)
 */
interface RFMFilters {
  recency: number;
  frequency: number;
  monetary: number;
}

/**
 * Props interface for RFMFilters component
 * @interface RFMFiltersProps
 * @property {RFMFilters} filters - Current filter values
 * @property {function} onFiltersChange - Callback when filters change
 * @property {number} totalCustomers - Total number of customers in dataset
 * @property {number} filteredCustomers - Number of customers after filtering
 */
interface RFMFiltersProps {
  filters: RFMFilters;
  onFiltersChange: (filters: RFMFilters) => void;
  totalCustomers: number;
  filteredCustomers: number;
}

/**
 * RFM Filters component for filtering customer segments
 * Provides sliders for recency, frequency, and monetary score filtering
 * 
 * @param {RFMFiltersProps} props - Component props
 * @returns {React.JSX.Element} Rendered filters component
 * 
 * @example
 * ```typescript
 * <RFMFilters
 *   filters={currentFilters}
 *   onFiltersChange={setFilters}
 *   totalCustomers={100}
 *   filteredCustomers={45}
 * />
 * ```
 */
export default function RFMFilters({
  filters,
  onFiltersChange,
  totalCustomers,
  filteredCustomers
}: RFMFiltersProps): React.JSX.Element {
  /**
   * Handles slider value change for a specific filter
   * @param {keyof RFMFilters} filterKey - The filter to update
   * @param {string} value - New slider value
   */
  const handleSliderChange = (filterKey: keyof RFMFilters, value: string) => {
    const newFilters = {
      ...filters,
      [filterKey]: parseInt(value, 10)
    };
    onFiltersChange(newFilters);
  };

  /**
   * Resets all filters to their default values
   */
  const handleResetFilters = () => {
    onFiltersChange({
      recency: 1,
      frequency: 1,
      monetary: 1
    });
  };

  /**
   * Gets score description for display
   * @param {number} score - RFM score (1-5)
   * @returns {string} Human-readable score description
   */
  const getScoreDescription = (score: number): string => {
    switch (score) {
      case 1: return 'Very Low';
      case 2: return 'Low';
      case 3: return 'Medium';
      case 4: return 'High';
      case 5: return 'Very High';
      default: return 'Unknown';
    }
  };

  /**
   * Gets color class for score display
   * @param {number} score - RFM score (1-5)
   * @returns {string} Tailwind CSS color class
   */
  const getScoreColor = (score: number): string => {
    switch (score) {
      case 1: return 'text-red-600 dark:text-red-400';
      case 2: return 'text-orange-600 dark:text-orange-400';
      case 3: return 'text-yellow-600 dark:text-yellow-400';
      case 4: return 'text-blue-600 dark:text-blue-400';
      case 5: return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          RFM Filters
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Filter customers by Recency, Frequency, and Monetary scores
        </p>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredCustomers} of {totalCustomers} customers
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        {/* Recency Filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Recency Score (R)
            </label>
            <span className={`text-sm font-semibold ${getScoreColor(filters.recency)}`}>
              {filters.recency} - {getScoreDescription(filters.recency)}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={filters.recency}
            onChange={(e) => handleSliderChange('recency', e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>1 (Best)</span>
            <span>5 (Worst)</span>
          </div>
        </div>

        {/* Frequency Filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Frequency Score (F)
            </label>
            <span className={`text-sm font-semibold ${getScoreColor(filters.frequency)}`}>
              {filters.frequency} - {getScoreDescription(filters.frequency)}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={filters.frequency}
            onChange={(e) => handleSliderChange('frequency', e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>1 (Lowest)</span>
            <span>5 (Highest)</span>
          </div>
        </div>

        {/* Monetary Filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Monetary Score (M)
            </label>
            <span className={`text-sm font-semibold ${getScoreColor(filters.monetary)}`}>
              {filters.monetary} - {getScoreDescription(filters.monetary)}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={filters.monetary}
            onChange={(e) => handleSliderChange('monetary', e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>1 (Lowest)</span>
            <span>5 (Highest)</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleResetFilters}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          Reset Filters
        </button>
      </div>

      {/* Filter Summary */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Current Filter:</strong> R{filters.recency} F{filters.frequency} M{filters.monetary}
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
          Minimum scores required for each dimension
        </div>
      </div>
    </div>
  );
} 