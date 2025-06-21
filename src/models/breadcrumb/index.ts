export interface BreadcrumbItem {
  title: string;
  link?: string;
  icon?: React.ReactElement; // New interface to allow custom icon
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}