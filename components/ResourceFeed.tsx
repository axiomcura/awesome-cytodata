
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Fuse from 'fuse.js';
import { Resource, Category } from '../types';
import { ResourceCard } from './ResourceCard';

interface ResourceFeedProps {
  resources: Resource[];
}

const allCategories = ['All', ...Object.values(Category)];
const ITEMS_PER_PAGE = 12;

export const ResourceFeed: React.FC<ResourceFeedProps> = ({ resources }) => {
  // Filters
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  // View State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Default to list for better scanning
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Refs for infinite scroll
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Derive available years from data
  const availableYears = useMemo(() => {
    const years = new Set<number>(resources.map(r => new Date(r.date_published).getFullYear()));
    return ['All', ...Array.from(years).sort((a: number, b: number) => b - a)];
  }, [resources]);

  // Configure Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(resources, {
      keys: ['title', 'summary', 'authors', 'journal', 'abstract'],
      threshold: 0.3,
      distance: 100,
      ignoreLocation: true // Search anywhere in string
    });
  }, [resources]);

  // Filter & Sort Logic
  const filteredResources = useMemo(() => {
    let results = resources;

    // 1. Search Filter
    if (query.trim()) {
      results = fuse.search(query).map(result => result.item);
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      results = results.filter(r => r.category === selectedCategory);
    }

    // 3. Year Filter
    if (selectedYear !== 'All') {
      results = results.filter(r => new Date(r.date_published).getFullYear().toString() === selectedYear);
    }

    // 4. Sort Logic
    results = [...results].sort((a, b) => {
      const dateA = new Date(a.date_published).getTime();
      const dateB = new Date(b.date_published).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return results;
  }, [resources, query, selectedCategory, selectedYear, fuse, sortOrder]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query, selectedCategory, selectedYear, sortOrder]);

  // Infinite Scroll Logic
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    }
  }, []);

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 0 };
    observerRef.current = new IntersectionObserver(handleObserver, option);
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    }
  }, [handleObserver, filteredResources]);

  const visibleResources = filteredResources.slice(0, visibleCount);

  // Reset all filters
  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('All');
    setSelectedYear('All');
    setSortOrder('newest');
  };

  const hasActiveFilters = query !== '' || selectedCategory !== 'All' || selectedYear !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="text-center py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Literature <span className="text-academic-600">Corpus</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600">
            Explore {resources.length} curated papers, reviews, and methods.
          </p>
        </div>

        {/* Control Bar (Sticky) */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm rounded-xl mb-8 transition-all">
           <div className="p-4 flex flex-col gap-4">
              
              {/* Row 1: Search & Main Filters */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                
                {/* Search */}
                <div className="relative w-full md:flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-academic-500 focus:border-academic-500 transition-all"
                    placeholder="Search by title, author, or keyword..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                {/* Filter Controls Group */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {/* Category Select */}
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="flex-1 md:flex-none appearance-none pl-3 pr-8 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm font-medium focus:ring-2 focus:ring-academic-500 cursor-pointer hover:bg-slate-50"
                    >
                      {allCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    {/* Year Select */}
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="flex-1 md:flex-none appearance-none pl-3 pr-8 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm font-medium focus:ring-2 focus:ring-academic-500 cursor-pointer hover:bg-slate-50"
                    >
                       <option value="All">All Years</option>
                       {availableYears.filter(y => y !== 'All').map(year => (
                         <option key={year} value={year}>{year}</option>
                       ))}
                    </select>

                    {/* Sort Select */}
                     <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                      className="flex-1 md:flex-none appearance-none pl-3 pr-8 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm font-medium focus:ring-2 focus:ring-academic-500 cursor-pointer hover:bg-slate-50"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>

                    {/* View Toggle */}
                    <div className="flex border border-slate-300 rounded-lg overflow-hidden bg-white">
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-2 transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-academic-600' : 'text-slate-500 hover:bg-slate-50'}`}
                            title="List View"
                        >
                            <i className="fa-solid fa-list"></i>
                        </button>
                        <div className="w-px bg-slate-300"></div>
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`px-3 py-2 transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-academic-600' : 'text-slate-500 hover:bg-slate-50'}`}
                            title="Grid View"
                        >
                            <i className="fa-solid fa-border-all"></i>
                        </button>
                    </div>
                </div>
              </div>

              {/* Row 2: Status & Active Filters */}
              {(hasActiveFilters || filteredResources.length > 0) && (
                  <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                      <div className="text-slate-500">
                          Showing <span className="font-bold text-slate-800">{filteredResources.length}</span> results
                          {selectedCategory !== 'All' && <span> in <span className="text-academic-600">{selectedCategory}</span></span>}
                          {selectedYear !== 'All' && <span> from <span className="text-academic-600">{selectedYear}</span></span>}
                      </div>

                      {hasActiveFilters && (
                          <button 
                             onClick={clearFilters}
                             className="text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                             <i className="fa-solid fa-times-circle"></i> Clear Filters
                          </button>
                      )}
                  </div>
              )}
           </div>
        </div>

        {/* Results */}
        <div className={`
            ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}
        `}>
          {visibleResources.map((resource) => (
            <div key={resource.id} className="animate-page-enter">
              <ResourceCard resource={resource} viewMode={viewMode} />
            </div>
          ))}
        </div>

        {/* Loading / Sentinel */}
        {visibleResources.length < filteredResources.length && (
           <div ref={loadMoreRef} className="py-12 flex justify-center items-center">
              <div className="flex flex-col items-center gap-2 text-slate-400">
                 <i className="fa-solid fa-circle-notch fa-spin text-2xl"></i>
                 <span className="text-sm font-medium">Loading more papers...</span>
              </div>
           </div>
        )}

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <div className="inline-block p-4 rounded-full bg-white mb-4 shadow-sm">
              <i className="fa-solid fa-magnifying-glass text-4xl text-slate-300"></i>
            </div>
            <h3 className="text-lg font-medium text-slate-900">No resources found</h3>
            <p className="text-slate-500 mb-6">We couldn't find any papers matching your filters.</p>
            <button 
                onClick={clearFilters}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
                Clear all filters
            </button>
          </div>
        )}
    </div>
  );
};
