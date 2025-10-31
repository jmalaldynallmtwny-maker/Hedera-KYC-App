// Filename: src/components/TanStackTableWrapper.tsx
import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState
} from '@tanstack/react-table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface TanStackTableWrapperProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableFilters?: boolean;
  enableColumnVisibility?: boolean;
  pageSize?: number;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  loading?: boolean;
}

export const TanStackTableWrapper = <T,>({
  data,
  columns,
  enablePagination = true,
  enableSorting = true,
  enableFilters = true,
  enableColumnVisibility = true,
  pageSize = 10,
  searchPlaceholder = 'بحث...',
  emptyMessage = 'لا توجد بيانات متاحة',
  className = '',
  onRowClick,
  loading = false
}: TanStackTableWrapperProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize
  });
  const [globalFilter, setGlobalFilter] = useState<string>('');

  // تعريف الجدول
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
      globalFilter
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // خيارات تم تفعيلها اعتمادًا على props
    enableSorting,
    // ملاحظة: enableColumnVisibility ليس خيارًا في TableOptions، لذلك لا نمرره هنا.
  });

  // عدد الصفحات
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalRows = data.length;
  const visibleRows = table.getRowModel().rows.length;

  // أعمدة قابلة للتبديل
  const visibleColumns = useMemo(() => {
    return table.getAllLeafColumns().filter(column => column.getCanHide());
  }, [table]);

  if (loading) {
    return (
      <Card className={className}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل البيانات...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      {/* شريط الأدوات */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200">
        {/* البحث العام */}
        {enableFilters && (
          <div className="flex-1">
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-sm"
            />
          </div>
        )}

        {/* التحكم في الأعمدة */}
        {enableColumnVisibility && visibleColumns.length > 0 && (
          <div className="relative">
            <details className="dropdown">
              <summary className="btn btn-outline cursor-pointer" aria-haspopup="true" title="إدارة الأعمدة">
                👁️ الأعمدة
              </summary>
              <div className="dropdown-content bg-white border border-gray-200 rounded-lg shadow-lg p-2 mt-1 min-w-48 z-10">
                {visibleColumns.map(column => (
                  <label
                    key={column.id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      aria-checked={column.getIsVisible()}
                      aria-label={`Toggle column ${String(column.id)}`}
                    />
                    <span className="text-sm text-gray-700">
                      {typeof column.columnDef.header === 'string'
                        ? column.columnDef.header
                        : String(column.id)}
                    </span>
                  </label>
                ))}
              </div>
            </details>
          </div>
        )}

        {/* معلومات النتائج */}
        <div className="text-sm text-gray-600 flex items-center">
          عرض {visibleRows} من {totalRows} عنصر
        </div>
      </div>

      {/* الجدول */}
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          {/* رأس الجدول */}
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                    scope="col"
                  >
                    <div className="flex items-center space-x-1">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      {enableSorting && header.column.getCanSort() && (
                        <span className="flex flex-col">
                          <span className={
                            header.column.getIsSorted() === 'asc'
                              ? 'text-blue-600'
                              : 'text-gray-400'
                          }>▲</span>
                          <span className={
                            header.column.getIsSorted() === 'desc'
                              ? 'text-blue-600'
                              : 'text-gray-400'
                          }>▼</span>
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* جسم الجدول */}
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={clsx(
                    'hover:bg-gray-50 transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-4xl">📭</div>
                    <p className="text-lg font-medium">{emptyMessage}</p>
                    {globalFilter && (
                      <p className="text-sm">
                        حاول تعديل مصطلحات البحث الخاصة بك
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* الترقيم */}
      {enablePagination && pageCount > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-200 space-y-4 sm:space-y-0">
          {/* معلومات الصفحة */}
          <div className="text-sm text-gray-600">
            الصفحة {currentPage} من {pageCount}
          </div>

          {/* عناصر التحكم في الصفحات */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              size="sm"
            >
              ⏮️ الأولى
            </Button>

            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              size="sm"
            >
              ◀️ السابقة
            </Button>

            {/* أرقام الصفحات */}
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                const startPage = Math.max(1, Math.min(pageCount - 4, currentPage - 2));
                const pageNum = startPage + i;
                if (pageNum > pageCount) return null;

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'primary' : 'outline'}
                    onClick={() => table.setPageIndex(pageNum - 1)}
                    size="sm"
                    className="min-w-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="sm"
            >
              التالية ▶️
            </Button>

            <Button
              variant="outline"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              size="sm"
            >
              الأخيرة ⏭️
            </Button>
          </div>

          {/* اختيار حجم الصفحة */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">
              عدد العناصر:
            </label>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              aria-label="اختر حجم الصفحة"
              title="اختر عدد العناصر في كل صفحة"
            >
              {[10, 20, 50, 100].map(ps => (
                <option key={ps} value={ps}>
                  {ps}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </Card>
  );
};

// مكون مساعد للخلايا المخصصة
interface StatusCellProps {
  status: 'success' | 'warning' | 'error' | 'info';
  text: string;
}

export const StatusCell: React.FC<StatusCellProps> = ({ status, text }) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      getStatusClasses(status)
    )}>
      {text}
    </span>
  );
};

// مكون مساعد لأزرار العمل
interface ActionCellProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  size?: 'sm' | 'md';
}

export const ActionCell: React.FC<ActionCellProps> = ({
  onEdit,
  onDelete,
  onView,
  size = 'sm'
}) => {
  const sizeClasses = size === 'sm' ? 'p-1 text-sm' : 'p-2';

  return (
    <div className="flex items-center space-x-1">
      {onView && (
        <button
          onClick={onView}
          className={clsx(
            'text-blue-600 hover:text-blue-800 transition-colors',
            sizeClasses
          )}
          title="عرض"
        >
          👁️
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className={clsx(
            'text-green-600 hover:text-green-800 transition-colors',
            sizeClasses
          )}
          title="تعديل"
        >
          ✏️
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className={clsx(
            'text-red-600 hover:text-red-800 transition-colors',
            sizeClasses
          )}
          title="حذف"
        >
          🗑️
        </button>
      )}
    </div>
  );
};

// دالة مساعدة للـ className
function clsx(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default TanStackTableWrapper;
