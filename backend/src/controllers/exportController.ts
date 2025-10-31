// backend/src/controllers/exportController.ts
import { Request, Response } from 'express';
import { exportService } from '../services/exportService.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

interface AdminRequest extends Request {
  admin?: {
    adminId?: string;
    bankId?: string;
    [key: string]: any;
  };
}

export const exportController = {
  generateExport: asyncHandler(async (req: AdminRequest, res: Response) => {
    const { bankId } = req.params;
    const { format, filters } = req.body;

    const adminId = req.admin?.adminId;

    if (!adminId) {
      throw new AppError('Authentication required', 401);
    }

    if (!format || !['pdf', 'csv', 'xlsx', 'json'].includes(format)) {
      throw new AppError('Invalid format. Must be one of: pdf, csv, xlsx, json', 400);
    }

    const result = await exportService.generateExport({
      format: format as 'pdf' | 'csv' | 'xlsx' | 'json',
      filters,
      requestedByAdminId: adminId,
      bankId
    });

    res.json({
      success: true,
      data: result,
      message: `Export generated successfully in ${format.toUpperCase()} format`
    });
  }),

  generateReport: asyncHandler(async (req: AdminRequest, res: Response) => {
    const { bankId } = req.params;
    const { filters } = req.body;
    const adminId = req.admin?.adminId;

    if (!adminId) {
      throw new AppError('Authentication required', 401);
    }

    const report = await exportService.generateReport(filters, bankId);

    res.json({
      success: true,
      data: report,
      message: 'Report generated successfully'
    });
  }),

  getExportFormats: asyncHandler(async (req: Request, res: Response) => {
    const formats = [
      {
        format: 'csv',
        name: 'CSV File',
        description: 'Comma-separated values for spreadsheet applications',
        maxRows: 10000,
        supports: ['data', 'tables']
      },
      {
        format: 'pdf',
        name: 'PDF Report',
        description: 'Formatted report with charts and analysis',
        maxRows: 1000,
        supports: ['reports', 'analytics']
      },
      {
        format: 'xlsx',
        name: 'Excel Workbook',
        description: 'Microsoft Excel format with multiple sheets',
        maxRows: 50000,
        supports: ['data', 'tables', 'charts']
      },
      {
        format: 'json',
        name: 'JSON Data',
        description: 'Structured data for developers and APIs',
        maxRows: 10000,
        supports: ['data', 'api']
      }
    ];

    res.json({
      success: true,
      data: formats
    });
  }),

  getExportHistory: asyncHandler(async (req: AdminRequest, res: Response) => {
    const { bankId } = req.params;
    const adminId = req.admin?.adminId;

    if (!adminId) {
      throw new AppError('Authentication required', 401);
    }

    // Mock export history for demo
    const history = [
      {
        id: 'export-1',
        format: 'csv',
        recordCount: 150,
        exportedAt: new Date(Date.now() - 86400000).toISOString(),
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'export-2',
        format: 'pdf',
        recordCount: 150,
        exportedAt: new Date(Date.now() - 172800000).toISOString(),
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    res.json({
      success: true,
      data: history
    });
  })
};

