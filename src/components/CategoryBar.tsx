import { CATEGORIES } from '../constants';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';
import React from 'react';

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function CategoryBar({ activeCategory, onCategoryChange }: CategoryBarProps) {
  return (
    <div className="bg-white border-b border-stone-100 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4">
          {CATEGORIES.map((category) => {
            const IconComponent = (Icons as any)[category.icon] as React.ElementType;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "flex flex-col items-center gap-2 min-w-fit group transition-all",
                  isActive ? "text-emerald-600" : "text-stone-500 hover:text-stone-800"
                )}
              >
                <div className={cn(
                  "p-3 rounded-2xl transition-all duration-300",
                  isActive 
                    ? "bg-emerald-50 ring-2 ring-emerald-500/20" 
                    : "bg-stone-50 group-hover:bg-stone-100"
                )}>
                  {IconComponent && <IconComponent className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />}
                </div>
                <span className={cn(
                  "text-xs font-bold whitespace-nowrap tracking-tight",
                  isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                )}>
                  {category.name}
                </span>
                {isActive && (
                  <div className="h-1 w-1 bg-emerald-600 rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
