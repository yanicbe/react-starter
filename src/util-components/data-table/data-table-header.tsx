import { Badge } from "@/ui-components/ui/badge";

export interface DataTableHeaderProps {
  totalCount: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const DataTableHeader = ({ totalCount, title, description, children: topRightComponent }: DataTableHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="outline">Total: {totalCount}</Badge>
        {topRightComponent}
      </div>
    </div>
  );
};

export default DataTableHeader;
