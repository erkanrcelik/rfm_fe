import { NextRequest, NextResponse } from 'next/server';

/**
 * Request body interface for selected IDs API
 * @interface SelectedIdsRequest
 * @property {string[]} selectedIds - Array of selected customer IDs
 */
interface SelectedIdsRequest {
  selectedIds: string[];
}

/**
 * Response interface for selected IDs API
 * @interface SelectedIdsResponse
 * @property {boolean} success - Whether the operation was successful
 * @property {string} message - Response message
 * @property {number} count - Number of selected IDs
 * @property {string[]} selectedIds - Array of selected IDs (echoed back)
 */
interface SelectedIdsResponse {
  success: boolean;
  message: string;
  count: number;
  selectedIds: string[];
}

/**
 * POST handler for /api/selected-ids endpoint
 * Receives selected customer IDs and returns confirmation
 * 
 * @param {NextRequest} request - Next.js request object
 * @returns {Promise<NextResponse>} Response with operation status
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body: SelectedIdsRequest = await request.json();
    const { selectedIds } = body;
    
    // Validate input
    if (!selectedIds || !Array.isArray(selectedIds)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request: selectedIds must be an array',
          count: 0,
          selectedIds: []
        } as SelectedIdsResponse,
        { status: 400 }
      );
    }
    
    // Validate that all IDs are strings
    if (!selectedIds.every(id => typeof id === 'string')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request: all selectedIds must be strings',
          count: 0,
          selectedIds: []
        } as SelectedIdsResponse,
        { status: 400 }
      );
    }
    
    // Mock processing delay to simulate real API behavior
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return success response
    const response: SelectedIdsResponse = {
      success: true,
      message: `Successfully processed ${selectedIds.length} selected customer(s)`,
      count: selectedIds.length,
      selectedIds: selectedIds
    };
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    console.error('Error processing selected IDs:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        count: 0,
        selectedIds: []
      } as SelectedIdsResponse,
      { status: 500 }
    );
  }
}

/**
 * GET handler for /api/selected-ids endpoint
 * Returns information about the API endpoint
 * 
 * @returns {Promise<NextResponse>} Response with API information
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    message: 'RFM Selected IDs API',
    description: 'POST endpoint for processing selected customer IDs from RFM analysis',
    method: 'POST',
    body: {
      selectedIds: 'string[] - Array of customer IDs to process'
    },
    response: {
      success: 'boolean - Operation success status',
      message: 'string - Response message',
      count: 'number - Number of processed IDs',
      selectedIds: 'string[] - Echoed back selected IDs'
    }
  });
} 