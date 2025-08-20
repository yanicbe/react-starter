import SearchInput from "@/ui-components/ui/search-input";

export interface DataTableSearchProps {
  searchText?: string;
  setSearchText: (text?: string) => void;
  displayText: string;
}

const DataTableSearch = ({ searchText, setSearchText, displayText }: DataTableSearchProps) => {
  return (
    <div className="flex justify-between items-center">
      <SearchInput searchText={searchText} setSearchText={setSearchText} />
      <div className="text-sm text-muted-foreground">{displayText}</div>
    </div>
  );
};

export default DataTableSearch;
