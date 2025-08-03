'use client';

import React, { useState, useCallback } from 'react';
import { RFMScore } from '@/utils/rfmCalculator';

/**
 * Props interface for RFMGrid component
 * @interface RFMGridProps
 * @property {RFMScore[]} scores - Array of RFM scores to display
 * @property {string[]} selectedIds - Array of currently selected customer IDs
 * @property {function} onSelectionChange - Callback when selection changes
 * @property {boolean} selectable - Whether grid cells are selectable
 */
interface RFMGridProps {
  scores: RFMScore[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  selectable?: boolean;
}

/**
 * Grid cell data interface
 * @interface GridCell
 * @property {number} count - Number of customers in this cell
 * @property {RFMScore[]} items - Array of RFM scores in this cell
 * @property {boolean} isSelected - Whether this cell is selected
 */
interface GridCell {
  count: number;
  items: RFMScore[];
  isSelected: boolean;
}

/**
 * RFM Grid component for displaying customer segments in a 5x5 grid
 * Displays frequency (x-axis) vs monetary (y-axis) scores
 * 
 * @param {RFMGridProps} props - Component props
 * @returns {React.JSX.Element} Rendered grid component
 * 
 * @example
 * ```typescript
 * <RFMGrid
 *   scores={rfmScores}
 *   selectedIds={selectedIds}
 *   onSelectionChange={setSelectedIds}
 *   selectable={true}
 * />
 * ```
 */
export default function RFMGrid({ 
  scores, 
  selectedIds, 
  onSelectionChange, 
  selectable = true 
}: RFMGridProps): React.JSX.Element {
  const [gridData, setGridData] = useState<Record<string, GridCell>>({});

  /**
   * Generates grid data from RFM scores
   * @param {RFMScore[]} scoreData - Array of RFM scores
   * @returns {Record<string, GridCell>} Grid data organized by coordinates
   */
  const generateGridData = useCallback((scoreData: RFMScore[]): Record<string, GridCell> => {
    const grid: Record<string, GridCell> = {};
    
    // Initialize 5x5 grid
    for (let x = 1; x <= 5; x++) {
      for (let y = 1; y <= 5; y++) {
        const key = `${x}-${y}`;
        grid[key] = { count: 0, items: [], isSelected: false };
      }
    }
    
    // Populate grid with scores
    scoreData.forEach(score => {
      const key = `${score.x}-${score.y}`;
      if (grid[key]) {
        grid[key].count++;
        grid[key].items.push(score);
      }
    });
    
    return grid;
  }, []);

  /**
   * Handles cell click for selection
   * @param {string} cellKey - Grid cell coordinate key
   */
  const handleCellClick = useCallback((cellKey: string) => {
    if (!selectable) return;
    
    const cell = gridData[cellKey];
    if (!cell || cell.count === 0) return;
    
    const cellIds = cell.items.map(item => item.id);
    const newSelectedIds = [...selectedIds];
    
    // Toggle selection for all items in the cell
    cellIds.forEach(id => {
      const index = newSelectedIds.indexOf(id);
      if (index > -1) {
        newSelectedIds.splice(index, 1);
      } else {
        newSelectedIds.push(id);
      }
    });
    
    onSelectionChange(newSelectedIds);
  }, [gridData, selectedIds, onSelectionChange, selectable]);

  // Update grid data when scores change
  React.useEffect(() => {
    const newGridData = generateGridData(scores);
    
    // Mark cells as selected if they contain selected IDs
    Object.keys(newGridData).forEach(key => {
      const cell = newGridData[key];
      cell.isSelected = cell.items.some(item => selectedIds.includes(item.id));
    });
    
    setGridData(newGridData);
  }, [scores, selectedIds, generateGridData]);

  /**
   * Gets color intensity based on customer count
   * @param {number} count - Number of customers in cell
   * @returns {string} Tailwind CSS color class
   */
  const getCellColor = (count: number): string => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count <= 2) return 'bg-blue-200 dark:bg-blue-800';
    if (count <= 5) return 'bg-blue-300 dark:bg-blue-700';
    if (count <= 10) return 'bg-blue-400 dark:bg-blue-600';
    return 'bg-blue-500 dark:bg-blue-500';
  };

  /**
   * Gets border color for selected cells
   * @param {boolean} isSelected - Whether cell is selected
   * @returns {string} Tailwind CSS border class
   */
  const getBorderColor = (isSelected: boolean): string => {
    return isSelected 
      ? 'border-2 border-green-500 dark:border-green-400' 
      : 'border border-gray-300 dark:border-gray-600';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Grid Header */}
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          RFM Segmentation Grid
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Frequency (X-axis) vs Monetary (Y-axis) - {scores.length} customers
        </p>
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-block mr-4">Total cells: 25</span>
          <span className="inline-block mr-4">Populated cells: {Object.values(gridData).filter(cell => cell.count > 0).length}</span>
          <span className="inline-block">Max customers per cell: {Math.max(...Object.values(gridData).map(cell => cell.count))}</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-5 gap-1 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">
        {/* Y-axis labels (Monetary) */}
        <div className="col-span-1 grid grid-rows-5 gap-1">
          {[5, 4, 3, 2, 1].map(y => (
            <div key={y} className="flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
              M{y}
            </div>
          ))}
        </div>

        {/* Grid cells */}
        <div className="col-span-4 grid grid-cols-5 gap-1">
          {/* X-axis labels (Frequency) */}
          <div className="col-span-5 grid grid-cols-5 gap-1 mb-1">
            {[1, 2, 3, 4, 5].map(x => (
              <div key={x} className="text-center text-xs font-medium text-gray-600 dark:text-gray-400">
                F{x}
              </div>
            ))}
          </div>

          {/* Grid cells */}
          {[5, 4, 3, 2, 1].map(y => (
            <React.Fragment key={y}>
              {[1, 2, 3, 4, 5].map(x => {
                const key = `${x}-${y}`;
                const cell = gridData[key] || { count: 0, items: [], isSelected: false };
                
                return (
                  <div
                    key={key}
                    className={`
                      aspect-square rounded-md transition-all duration-200
                      ${getCellColor(cell.count)}
                      ${getBorderColor(cell.isSelected)}
                      ${selectable && cell.count > 0 ? 'cursor-pointer hover:scale-105' : ''}
                      flex flex-col items-center justify-center
                    `}
                    onClick={() => handleCellClick(key)}
                    title={`F${x}-M${y}: ${cell.count} customers`}
                  >
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {cell.count}
                    </span>
                    {cell.count > 0 && (
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {cell.isSelected ? '✓' : ''}
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded"></div>
          <span>Empty</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200 dark:bg-blue-800 rounded"></div>
          <span>1-2 customers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-300 dark:bg-blue-700 rounded"></div>
          <span>3-5 customers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 dark:bg-blue-600 rounded"></div>
          <span>6-10 customers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 dark:bg-blue-500 rounded"></div>
          <span>10+ customers</span>
        </div>
      </div>
    </div>
  );
} 