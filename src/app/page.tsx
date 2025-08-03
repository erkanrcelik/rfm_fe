'use client';

import React, { useState, useEffect, useCallback } from 'react';
import RFMGrid from '@/components/RFMGrid';
import RFMFilters from '@/components/RFMFilters';
import { generateMockRFMData, RFMData } from '@/utils/mockData';
import { calculateRFMScores, filterRFMScores, RFMScore } from '@/utils/rfmCalculator';
import { useSubmitSelectedIds } from '@/hooks/useRfmApi';

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
 * Main RFM Analysis page component
 * Integrates grid visualization, filtering, and API submission functionality
 * 
 * @returns {React.JSX.Element} Rendered RFM analysis interface
 */
export default function RFMAnalysisPage(): React.JSX.Element {
  // State management
  const [rfmData, setRfmData] = useState<RFMData[]>([]);
  const [rfmScores, setRfmScores] = useState<RFMScore[]>([]);
  const [filteredScores, setFilteredScores] = useState<RFMScore[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<RFMFilters>({
    recency: 1,
    frequency: 1,
    monetary: 1
  });
  const submitMutation = useSubmitSelectedIds();

  /**
   * Generates new mock data and recalculates scores
   * @param {number} count - Number of records to generate
   */
  const generateNewData = useCallback((count: number = 100) => {
    const newData = generateMockRFMData(count);
    setRfmData(newData);
    
    const newScores = calculateRFMScores(newData);
    setRfmScores(newScores);
    setFilteredScores(newScores);
    
    // Reset selections when data changes
    setSelectedIds([]);
  }, []);

  /**
   * Handles filter changes and updates filtered scores
   * @param {RFMFilters} newFilters - New filter criteria
   */
  const handleFiltersChange = useCallback((newFilters: RFMFilters) => {
    setFilters(newFilters);
    
    const filtered = filterRFMScores(rfmScores, newFilters);
    setFilteredScores(filtered);
    
    // Clear selections when filters change
    setSelectedIds([]);
  }, [rfmScores]);

  /**
   * Handles selection changes in the grid
   * @param {string[]} newSelectedIds - New array of selected IDs
   */
  const handleSelectionChange = useCallback((newSelectedIds: string[]) => {
    setSelectedIds(newSelectedIds);
  }, []);

  /**
   * Submits selected IDs to the API endpoint
   */
  const handleSubmitSelectedIds = () => {
    if (selectedIds.length === 0) {
      return;
    }

    submitMutation.mutate({ selectedIds });
  };

  /**
   * Clears all selections
   */
  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  // Initialize with sample data on component mount
  useEffect(() => {
    generateNewData(150); // Start with 150 records to meet minimum requirement
  }, [generateNewData]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                RFM Customer Segmentation
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Analyze customer segments using Recency, Frequency, and Monetary scores
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Current dataset: {rfmData.length} customers
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => generateNewData(100)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Generate 100 Records
              </button>
              <button
                onClick={() => generateNewData(200)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Generate 200 Records
              </button>
              <button
                onClick={() => generateNewData(500)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Generate 500 Records
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <RFMFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              totalCustomers={rfmScores.length}
              filteredCustomers={filteredScores.length}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Grid Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <RFMGrid
                scores={filteredScores}
                selectedIds={selectedIds}
                onSelectionChange={handleSelectionChange}
                selectable={true}
              />
            </div>

            {/* Selection Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Selected Customers
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedIds.length} customer(s) selected
                  </p>
                  {selectedIds.length > 0 && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      IDs: {selectedIds.slice(0, 5).join(', ')}
                      {selectedIds.length > 5 && ` and ${selectedIds.length - 5} more...`}
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleClearSelection}
                    disabled={selectedIds.length === 0}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Clear Selection
                  </button>
                  <button
                    onClick={handleSubmitSelectedIds}
                    disabled={selectedIds.length === 0 || submitMutation.isPending}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {submitMutation.isPending ? 'Submitting...' : 'Submit Selected IDs'}
                  </button>
                </div>
              </div>
            </div>

                        {/* API Response */}
            {(submitMutation.data || submitMutation.error) && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  API Response
                </h3>
                {submitMutation.data && (
                  <div className="p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <div className="text-sm font-medium text-green-800 dark:text-green-200">
                      {submitMutation.data.message}
                    </div>
                    <div className="mt-2 text-xs text-green-600 dark:text-green-300">
                      Processed {submitMutation.data.count} customer(s)
                    </div>
                  </div>
                )}
                {submitMutation.error && (
                  <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="text-sm font-medium text-red-800 dark:text-red-200">
                      Error: {submitMutation.error.message}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
