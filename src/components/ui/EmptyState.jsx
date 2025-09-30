import React from "react";

export default function EmptyState({ onClearFilters }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📚</div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        No Books Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Try changing your search criteria or filters
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-3 bg-main/60 hover:bg-main cursor-pointer text-white rounded-lg transition-colors duration-200"
      >
        Show All Books
      </button>
    </div>
  );
}
