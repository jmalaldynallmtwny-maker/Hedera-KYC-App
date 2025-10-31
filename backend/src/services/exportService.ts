// backend/src/services/exportService.ts
import { getBankDb, getCitizensDb } from '../lib/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { minioService } from '../lib/minio.js';

export interface ExportRequest {
  format: 'csv' | 'pdf' | 'xlsx' | 'json';
  filters: {
    dateFrom?: string;
    dateTo?: string;
    status?: string;
    bankId?: string;
    type?: string;
  };
  requestedByAdminId: string;
  bankId: string;
}

export interface ExportResult {
  downloadUrl: string;
  fileSize: string;
  generatedAt: Date;
  recordCount: number;
}

export class ExportService {
  async generateExport(request: ExportRequest): Promise<ExportResult> {
    try {
      const { format, filters, requestedByAdminId, bankId } = request;

      // Validate permissions
      await this.validateExportPermission(requestedByAdminId, bankId);

      // Generate data based on format
      let result: ExportResult;
      switch (format) {
        case 'csv':
          result = await this.generateCSV(filters, bankId);
          break;
        case 'pdf':
          result = await this.generatePDF(filters, bankId);
          break;
        case 'xlsx':
          result = await this.generateXLSX(filters, bankId);
          break;
        case 'json':
          result = await this.generateJSON(filters, bankId);
          break;
        default:
          throw new AppError(`Unsupported export format: ${format}`, 400);
      }

      // Log export activity
      await this.logExportActivity(requestedByAdminId, bankId, format, result.recordCount);

      return result;
    } catch (error: unknown) {
      console.error('Export generation error:', error);
      throw new AppError(
        `Export generation failed: ${error instanceof Error ? error.message : String(error)}`, 
        500
      );
    }
  }

  async generateReport(filters: any, bankId: string): Promise<any> {
    try {
      // Aggregate data for report
      const reportData = await this.aggregateReportData(filters, bankId);

      return {
        ...reportData,
        generatedAt: new Date().toISOString(),
        reportId: `report-${Date.now()}`
      };
    } catch (error: any) {
      console.error('Report generation error:', error);
      throw new AppError(`Report generation failed: ${error.message}`, 500);
    }
  }

  private async generateCSV(filters: any, bankId: string): Promise<ExportResult> {
    // Generate mock CSV data
    const records = await this.generateMockData(filters, bankId);
    const csvContent = this.convertToCSV(records);
    
    return {
      downloadUrl: `/api/admin/${bankId}/exports/kyc_data_${Date.now()}.csv`,
      fileSize: this.formatFileSize(Buffer.byteLength(csvContent, 'utf8')),
      generatedAt: new Date(),
      recordCount: records.length
    };
  }

  private async generatePDF(filters: any, bankId: string): Promise<ExportResult> {
    // Generate report data
    const reportData = await this.generateReport(filters, bankId);
    
    // For demo, return mock PDF URL
    return {
      downloadUrl: `/api/admin/${bankId}/exports/kyc_report_${Date.now()}.pdf`,
      fileSize: '2.1 MB',
      generatedAt: new Date(),
      recordCount: Object.keys(reportData).length
    };
  }

  private async generateXLSX(filters: any, bankId: string): Promise<ExportResult> {
    // Generate mock data
    const records = await this.generateMockData(filters, bankId);
    
    return {
      downloadUrl: `/api/admin/${bankId}/exports/kyc_data_${Date.now()}.xlsx`,
      fileSize: '1.8 MB',
      generatedAt: new Date(),
      recordCount: records.length
    };
  }

  private async generateJSON(filters: any, bankId: string): Promise<ExportResult> {
    const records = await this.generateMockData(filters, bankId);
    const jsonContent = JSON.stringify(records, null, 2);
    
    return {
      downloadUrl: `/api/admin/${bankId}/exports/kyc_data_${Date.now()}.json`,
      fileSize: this.formatFileSize(Buffer.byteLength(jsonContent, 'utf8')),
      generatedAt: new Date(),
      recordCount: records.length
    };
  }

  private async generateMockData(filters: any, bankId: string): Promise<any[]> {
    // Generate mock KYC data for demo
    return Array.from({ length: 50 }, (_, i) => ({
      id: `req-${Date.now()}-${i}`,
      masked_nni: `2001****${i.toString().padStart(2, '0')}`,
      status: ['PENDING', 'APPROVED', 'REJECTED'][i % 3],
      occupation: ['Farmer', 'Teacher', 'Merchant', 'Government Employee', 'Fisherman'][i % 5],
      source_of_funds: ['Salary', 'Business', 'Agriculture', 'Fishing', 'Other'][i % 5],
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      bank_votes: {
        baybank: i % 3 === 0 ? 'APPROVE' : 'PENDING',
        oasisbank: i % 3 === 1 ? 'APPROVE' : 'PENDING',
        zenbank: i % 3 === 2 ? 'APPROVE' : 'PENDING',
        arcbank: i % 4 === 0 ? 'REJECT' : 'PENDING',
        nexbank: i % 5 === 0 ? 'APPROVE' : 'PENDING'
      }
    }));
  }

  private convertToCSV(data: any[]): string {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        const escaped = String(value ?? '').replace(/"/g, '""');
        return escaped.includes(',') ? `"${escaped}"` : escaped;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  }

  private formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  private async validateExportPermission(adminId: string, bankId: string): Promise<void> {
    const db = getBankDb(bankId);
    const admin = await db.admin.findUnique({
      where: { id: adminId }
    });

    if (!admin) {
      throw new AppError('Admin not found', 404);
    }
  }

  private async logExportActivity(adminId: string, bankId: string, format: string, recordCount: number): Promise<void> {
    const db = getBankDb(bankId);
    
    await db.auditLog.create({
      data: {
        event_type: 'EXPORT_GENERATED',
        meta_hash: `export-${Date.now()}`,
        details: {
          adminId,
          format,
          recordCount,
          exportedAt: new Date().toISOString()
        }
      }
    });
  }

  private async aggregateReportData(filters: any, bankId: string): Promise<any> {
    // Generate mock report data
    return {
      summary: {
        totalRequests: 150,
        approvedRequests: 45,
        rejectedRequests: 15,
        pendingRequests: 90,
        approvalRate: 30
      },
      voteDistribution: [
        { vote: 'APPROVE', count: 120 },
        { vote: 'REJECT', count: 25 },
        { vote: 'PENDING', count: 5 }
      ],
      bankPerformance: [
        { bankId: 'baybank', approvalRate: 85, totalVotes: 40 },
        { bankId: 'oasisbank', approvalRate: 78, totalVotes: 38 },
        { bankId: 'zenbank', approvalRate: 92, totalVotes: 42 },
        { bankId: 'arcbank', approvalRate: 65, totalVotes: 35 },
        { bankId: 'nexbank', approvalRate: 88, totalVotes: 39 }
      ],
      generatedAt: new Date().toISOString()
    };
  }
}

export const exportService = new ExportService();