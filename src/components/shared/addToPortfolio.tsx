import { usePortfolioActions } from '@/hooks/usePortfolioActions';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMinusCircle,
  faPlusCircle,
  faStar as faStarSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/buttonVariants';

interface AddToPortfolioProps {
  coinId: string;
  isIcon?: boolean;
  className?: string;
  size?: VariantProps<typeof buttonVariants>['size'];
  variant?: VariantProps<typeof buttonVariants>['variant'];
}

export function AddToPortfolio({
  coinId,
  isIcon = false,
  className = '',
  size,
  variant = 'default',
}: AddToPortfolioProps) {
  const coins = useAppSelector((state) => state.portfolio.coins);
  const { add, remove } = usePortfolioActions();
  const inPortfolio = !!coins[coinId];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inPortfolio) {
      remove(coinId);
    } else {
      add(coinId);
    }
  };

  if (isIcon) {
    return (
      <span
        title={inPortfolio ? 'Remove from portfolio' : 'Add to portfolio'}
        className={
          'inline-flex items-center justify-center cursor-pointer p-2 rounded ' +
          (inPortfolio ? 'text-yellow-400' : 'text-gray-400/50 hover:text-yellow-400') +
          ' hover:bg-yellow-100/10 ' +
          className
        }
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={inPortfolio ? faStarSolid : faStarRegular} size='lg' />
      </span>
    );
  }

  return (
    <Button
      onClick={handleClick}
      className={className}
      size={size}
      variant={inPortfolio ? 'secondary' : variant}
      disabled={false}
    >
      <FontAwesomeIcon icon={inPortfolio ? faMinusCircle : faPlusCircle} size='lg' />
      {inPortfolio ? 'Remove from portfolio' : 'Add to portfolio'}
    </Button>
  );
}
