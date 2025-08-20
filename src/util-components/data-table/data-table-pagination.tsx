import { Button } from "@/ui-components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DataTablePaginationProps {
  currentPage: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
}

const DataTablePagination = ({
  currentPage,
  pageCount,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}: DataTablePaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Seite {currentPage} von {pageCount}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={!hasPrevPage}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Vorherige
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
            const pageNum = Math.max(1, Math.min(pageCount - 4, Math.max(1, currentPage - 2))) + i;

            if (pageNum <= pageCount) {
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            }
            return null;
          })}
        </div>

        <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={!hasNextPage}>
          Nächste
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DataTablePagination;
