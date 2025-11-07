import { useMemo, useState } from 'react';
import { Check, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

type CategoryComboboxProps = {
  categories: string[];
  placeholder?: string;
  value?: string;
  onSelect: (value: string) => void;
  onCreateCategory: (value: string) => void;
  label?: string;
};

export function CategoryCombobox({
  categories,
  placeholder = 'Selecione',
  value,
  onSelect,
  onCreateCategory,
}: CategoryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    return categories.filter((category) =>
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const displayValue = categories.find(
    (category) => category.toLowerCase() === value?.toLowerCase()
  );

  const handleSelect = (category: string) => {
    onSelect(category);
    setOpen(false);
    setSearchTerm('');
  };

  const handleCreate = (category: string) => {
    if (!category.trim()) return;
    onCreateCategory(category.trim());
    setOpen(false);
    setSearchTerm('');
  };

  const renderCommandEmpty = () => {
    if (!searchTerm.trim()) {
      return <div className="p-4 text-sm text-muted-foreground">Nenhuma categoria encontrada.</div>;
    }

    return (
      <button
        type="button"
        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-primary hover:bg-primary/10"
        onClick={() => handleCreate(searchTerm)}
      >
        <PlusCircle className="h-4 w-4" />
        Adicionar "{searchTerm}" como nova categoria
      </button>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'group h-12 w-full justify-between rounded-2xl border-border/60 bg-background/70 px-4 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-background/55 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
            !value && 'text-muted-foreground group-hover:text-foreground'
          )}
        >
          {displayValue ?? placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] rounded-2xl border border-border/60 bg-background/95 p-0 shadow-xl">
        <Command>
          <CommandInput
            placeholder="Buscar categoria..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="h-11 border-b border-border/50 text-sm"
          />
          <CommandList>
            <CommandEmpty>{renderCommandEmpty()}</CommandEmpty>
            <CommandGroup>
              {filteredCategories.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={() => handleSelect(category)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-base"
                >
                  {category}
                  <Check
                    className={cn(
                      'h-4 w-4 text-primary transition-opacity',
                      category.toLowerCase() === value?.toLowerCase() ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
