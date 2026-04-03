import { useState, useEffect, useRef, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  category: string;
  searchQuery?: string;
}

export default function ProductGrid({ category, searchQuery = '' }: ProductGridProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setAllProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.materialComposition.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [allProducts, category, searchQuery]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-sm font-bold text-stone-400 uppercase tracking-widest">Loading sustainable items...</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-stone-50 p-6 rounded-full">
          <Loader2 className="w-10 h-10 text-stone-200" />
        </div>
        <h3 className="text-xl font-black text-stone-900">No products found</h3>
        <p className="text-stone-500 font-medium max-w-xs">We couldn't find any items matching your search. Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
