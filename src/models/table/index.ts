import { InfiniteData } from '@tanstack/react-query';

export interface InfiniteDataCustom<T, U = unknown> {
  allData?: T[];
  pages: InfiniteData<T, U>['pages'];
  pageParams: InfiniteData<T, U>['pageParams'];
}

export interface TableStyle {
  enableTopToolbar: boolean;
  enablePagination: boolean;
  enableRowNumbers: boolean;
  enableEditing: boolean;
  enableStickyHeader: boolean;
  enableFullScreenToggle: boolean;
  enableDensityToggle: boolean;
  enableHiding: boolean;
  enableFilters: boolean;
  enableSorting: boolean;
  enableColumnFilters: boolean;
  manualPagination: boolean;
  enableColumnActions: boolean;
  createDisplayMode: 'row' | 'custom' | 'modal' | undefined; // Adjusted type
  editDisplayMode: 'row' | 'custom' | 'modal' | 'table' | 'cell' | undefined; // Adjusted type
  mrtTheme: () => {
    baseBackgroundColor: string | undefined;
  };
  muiTablePaperProps: {
    sx: {
      padding: number;
      px: number;
      boxShadow: string;
      height: string;
    };
  };
  muiTableProps: {
    sx: {
      width: string;
      height: string;
      overflow?: string;
      overflowY?: string;
    };
  };
  muiTableContainerProps: {
    sx: {
      width: string;
      height: string;
      maxHeight: string;
      overflowY?: string;
      overflowX?: string;
    };
  };
  muiTableHeaderProps: {
    sx: {
      top: number;
      position: string;
      zIndex: number;
    };
  };
  muiTableHeadCellProps: object;
  muiTableBodyCellProps: {
    sx: {
      width: string;
      textAlign: string;
      justifyContent: string;
      overflow?: string;
      whiteSpace?: string;
      textOverflow: string;
    };
  };
  muiTableButtonProps: {
    sx: {
      overflow: string;
    };
  };
  muiTableFooterProps: {
    sx: {
      position: string;
      bottom: number;
      zIndex: number;
    };
  };
  muiTableBottomToolbarProps: {
    sx: {
      position: string;
      bottom: number;
      zIndex: number;
    };
  };
  muiPaginationProps?: () => {
    showRowsPerPage: boolean;
    sx: {
      '& .MuiPagination-ul': {
        justifyContent: string;
      };
      '& .MuiPaginationItem-root': {
        color: string | unknown;
        '&.Mui-selected': {
          backgroundColor: string;
          color: string | unknown;
          border: string;
          borderRadius: string;
        };
      };
      '& .MuiPaginationItem-root:hover': {
        backgroundColor: string | unknown;
      };
      '& .MuiPaginationItem-root.Mui-disabled': {
        color: string | unknown;
        border: string;
      };
    };
  };
  paginationDisplayMode: 'pages',
}

export type PaginationType = {
  pageIndex: number;
  pageSize: number;
};

export interface Pagination {
  pageSize: number;
  nextPageToken?: string;
  pageIndex: number;
}

export type PaginationProps = {
  pagination: PaginationType;
  totalItems: number;
  isFetchingNextPage: boolean;
  nextPageTokenIndexEmpty: number | undefined;
  nextPageToken: string | undefined;
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
  fetchNextPage: () => Promise<void>;
};

