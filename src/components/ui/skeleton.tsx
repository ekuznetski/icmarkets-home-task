import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-accent animate-pulse rounded-md', className)}
      aria-busy='true'
      aria-hidden='true'
      {...props}
    />
  );
}

export { Skeleton };
