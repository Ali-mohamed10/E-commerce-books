import React from "react";

export default function BookFilter({
  searchTerm,
  setSearchTerm,
  authorFilter,
  setAuthorFilter,
  listNameFilter,
  setListNameFilter,
  uniqueAuthors,
  uniqueListNames,
  filteredBooksCount,
  totalBooksCount,
  onFilterChange,
  onClearFilters,
}) {
  return (
    <div className="bg-white dark:bg-backgrounds rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Filter Books
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search by Book Name */}
        <div>
          <label
            htmlFor="bookSearch"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Search by Book Title
          </label>
          <input
            id="bookSearch"
            type="text"
            placeholder="Enter book title..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onFilterChange();
            }}
            className="w-full cursor-pointer px-4 py-2 border rounded-lg focus:ring-2 focus:ring-second focus:border-transparent dark:bg-gray-700"
          />
        </div>

        {/* Filter by Author */}
        <div>
          <label
            htmlFor="authorFilter"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Filter by Author
          </label>
          <select
            id="authorFilter"
            value={authorFilter}
            onChange={(e) => {
              setAuthorFilter(e.target.value);
              onFilterChange();
            }}
            className="w-full cursor-pointer px-4 py-2 border rounded-lg focus:ring-2 focus:ring-second focus:border-transparent dark:bg-gray-700"
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by List Name */}
        <div>
          <label
            htmlFor="listNameFilter"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Filter by Category
          </label>
          <select
            id="listNameFilter"
            value={listNameFilter}
            onChange={(e) => {
              setListNameFilter(e.target.value);
              onFilterChange();
            }}
            className="w-full cursor-pointer px-4 py-2 border rounded-lg focus:ring-2 focus:ring-second focus:border-transparent dark:bg-gray-700"
          >
            <option value="">All Categories</option>
            {uniqueListNames.map((listName) => (
              <option key={listName} value={listName}>
                {listName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredBooksCount} of {totalBooksCount} books
        </p>
      </div>

      {/* Clear Filters Button */}
      {(searchTerm || authorFilter || listNameFilter) && (
        <div className="mt-4 text-center">
          <button
            onClick={onClearFilters}
            className="px-6 py-2 bg-main/60 hover:bg-main cursor-pointer text-white rounded-lg transition-colors duration-200"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
