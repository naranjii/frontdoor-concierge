import { useState } from "react";
import { Search, Filter, X, Calendar, User, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'date' | 'text';
  options?: { value: string; label: string }[];
}

interface ActiveFilter {
  id: string;
  label: string;
  value: string;
}

interface SearchWithFiltersProps {
  placeholder?: string;
  onSearch: (query: string, filters: ActiveFilter[]) => void;
  filterOptions?: FilterOption[];
  className?: string;
}

export function SearchWithFilters({ 
  placeholder = "Search...", 
  onSearch, 
  filterOptions = [],
  className = ""
}: SearchWithFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query, activeFilters);
  };

  const addFilter = (filterId: string, value: string) => {
    const filterOption = filterOptions.find(f => f.id === filterId);
    if (!filterOption) return;

    const newFilter: ActiveFilter = {
      id: filterId,
      label: filterOption.label,
      value: value
    };

    const updatedFilters = [...activeFilters.filter(f => f.id !== filterId), newFilter];
    setActiveFilters(updatedFilters);
    onSearch(searchQuery, updatedFilters);
  };

  const removeFilter = (filterId: string) => {
    const updatedFilters = activeFilters.filter(f => f.id !== filterId);
    setActiveFilters(updatedFilters);
    onSearch(searchQuery, updatedFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    onSearch(searchQuery, []);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-20 h-11 bg-card border-border shadow-soft focus:shadow-medium transition-shadow"
        />
        
        {/* Filter Button */}
        {filterOptions.length > 0 && (
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-3"
              >
                <Filter className="h-3 w-3 mr-1" />
                Filter
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            
            <PopoverContent className="w-80 bg-card border shadow-medium" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm text-foreground">Advanced Filters</h4>
                  {activeFilters.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                {filterOptions.map((filter) => (
                  <div key={filter.id} className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground">
                      {filter.label}
                    </Label>
                    
                    {filter.type === 'select' && filter.options && (
                      <Select onValueChange={(value) => addFilter(filter.id, value)}>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {filter.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    
                    {filter.type === 'text' && (
                      <Input
                        placeholder={`Enter ${filter.label.toLowerCase()}`}
                        className="h-8"
                        onBlur={(e) => {
                          if (e.target.value) {
                            addFilter(filter.id, e.target.value);
                          }
                        }}
                      />
                    )}
                    
                    {filter.type === 'date' && (
                      <div className="border rounded-md p-2">
                        <CalendarComponent
                          mode="single"
                          onSelect={(date) => {
                            if (date) {
                              addFilter(filter.id, date.toISOString().split('T')[0]);
                            }
                          }}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge 
              key={filter.id} 
              variant="secondary" 
              className="flex items-center gap-1 py-1 px-2"
            >
              <span className="text-xs">{filter.label}: {filter.value}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFilter(filter.id)}
                className="h-3 w-3 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}