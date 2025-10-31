import { AppError } from '../middleware/errorHandler.js';

export interface SQLValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class SQLValidator {
  private static readonly BANNED_KEYWORDS = [
    'DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'UPDATE', 'INSERT', 
    'CREATE', 'EXEC', 'EXECUTE', 'GRANT', 'REVOKE', 'SHUTDOWN',
    ';', '/*', '*/', '--', 'UNION', 'INFORMATION_SCHEMA', 'PG_'
  ];

  private static readonly ALLOWED_TABLES = [
    'citizens', 'pending_requests', 'admins', 'votes', 
    'users', 'hedera_proofs', 'audit_logs', 'admin_faces'
  ];

  private static readonly ALLOWED_OPERATIONS = ['SELECT', 'WITH'];

  static validateSQL(sql: string, params: any[] = []): SQLValidationResult {
    const result: SQLValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    const upperSQL = sql.toUpperCase().trim();

    // Check for banned keywords
    for (const keyword of this.BANNED_KEYWORDS) {
      if (upperSQL.includes(keyword.toUpperCase())) {
        result.errors.push(`Banned SQL keyword detected: ${keyword}`);
        result.isValid = false;
      }
    }

    // Check if it's a SELECT query
    const isSelectQuery = this.ALLOWED_OPERATIONS.some(op => upperSQL.startsWith(op));
    if (!isSelectQuery) {
      result.errors.push('Only SELECT queries are allowed');
      result.isValid = false;
    }

    // Check for LIMIT clause to prevent large results
    if (!upperSQL.includes('LIMIT') && !upperSQL.includes('FETCH')) {
      result.warnings.push('Query should include LIMIT clause for performance');
    }

    // Validate LIMIT value
    const limitMatch = upperSQL.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      const limitValue = parseInt(limitMatch[1]);
      if (limitValue > 1000) {
        result.errors.push('LIMIT cannot exceed 1000 rows');
        result.isValid = false;
      }
    }

    // Check for potential SQL injection in params
    for (const param of params) {
      if (typeof param === 'string' && this.hasSQLInjectionIndicators(param)) {
        result.errors.push('Potential SQL injection detected in parameters');
        result.isValid = false;
        break;
      }
    }

    return result;
  }

  static validateTableAccess(sql: string, allowedTables: string[] = this.ALLOWED_TABLES): SQLValidationResult {
    const result: SQLValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    const upperSQL = sql.toUpperCase();

    // Extract table names from SQL
    const tableMatches = upperSQL.match(/(?:FROM|JOIN)\s+(\w+)/gi) || [];
    const tablesUsed = tableMatches.map(match => {
      const tableName = match.replace(/(?:FROM|JOIN)\s+/i, '').trim();
      return tableName.toLowerCase();
    });

    for (const table of tablesUsed) {
      if (!allowedTables.includes(table)) {
        result.errors.push(`Access to table '${table}' is not allowed`);
        result.isValid = false;
      }
    }

    return result;
  }

  static sanitizeSQL(sql: string): string {
    // Remove comments
    let sanitized = sql.replace(/--.*$/gm, '')
                      .replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Trim and normalize whitespace
    sanitized = sanitized.trim().replace(/\s+/g, ' ');
    
    return sanitized;
  }

  private static hasSQLInjectionIndicators(param: string): boolean {
    const dangerousPatterns = [
      /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bDELETE\b|\bUPDATE\b|\bDROP\b)/i,
      /('|"|;|--|\/\*|\*\/)/,
      /(\bOR\b|\bAND\b)\s+\d+=\d+/i,
      /EXEC(\s|\()/i,
      /XP_/i
    ];

    return dangerousPatterns.some(pattern => pattern.test(param));
  }
}

export const validateNL2SQLOutput = (llmOutput: any): { isValid: boolean; error?: string } => {
  try {
    // Check if output has required structure
    if (!llmOutput || typeof llmOutput !== 'object') {
      return { isValid: false, error: 'Invalid LLM output format' };
    }

    const { action, sql, params, confidence } = llmOutput;

    // Validate action
    const validActions = ['RESULTS', 'NAVIGATE', 'CONFIRM', 'ERROR'];
    if (!validActions.includes(action)) {
      return { isValid: false, error: `Invalid action: ${action}` };
    }

    // If action is RESULTS, validate SQL
    if (action === 'RESULTS') {
      if (!sql || typeof sql !== 'string') {
        return { isValid: false, error: 'SQL query is required for RESULTS action' };
      }

      if (confidence && (confidence < 0 || confidence > 1)) {
        return { isValid: false, error: 'Confidence must be between 0 and 1' };
      }

      // Validate SQL safety
      const sqlValidation = SQLValidator.validateSQL(sql, params);
      if (!sqlValidation.isValid) {
        return { 
          isValid: false, 
          error: `SQL validation failed: ${sqlValidation.errors.join(', ')}` 
        };
      }

      // Validate table access
      const tableValidation = SQLValidator.validateTableAccess(sql);
      if (!tableValidation.isValid) {
        return { 
          isValid: false, 
          error: `Table access validation failed: ${tableValidation.errors.join(', ')}` 
        };
      }
    }

    return { isValid: true };
  } catch (error: unknown) {
    return { 
      isValid: false, 
      error: `Validation error: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
};

export default SQLValidator;