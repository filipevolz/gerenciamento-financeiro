import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ptBR } from 'date-fns/locale';

import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '../../lib/utils';

export type DatePickerValue = Date | undefined;

type DatePickerProps = {
  id?: string;
  placeholder?: string;
  value?: DatePickerValue;
  onChange?: (date: DatePickerValue) => void;
  disabled?: boolean;
  className?: string;
};

export function DatePicker({
  id,
  placeholder = 'Selecionar data',
  value,
  onChange,
  disabled,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            'group w-full justify-between rounded-2xl border-border/60 bg-background/70 px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-background/55 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
            !value && 'text-muted-foreground group-hover:text-foreground',
            className
          )}
          disabled={disabled}
        >
          {value ? format(value, 'dd/MM/yyyy', { locale: ptBR }) : placeholder}
          <CalendarIcon className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-80" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          locale={ptBR}
          className="rounded-2xl border border-border/60 bg-background"
        />
      </PopoverContent>
    </Popover>
  );
}
