import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/apiSlice";

export default function DataPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);

  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Extract words safely
  const words = data?.words || [];

  // Filter by ID
  const filteredData = words.filter((item) =>
    item.id.toString().includes(searchId)
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Show only 10 page numbers at once
  const pageWindowSize = 10;
  const currentWindowStart = Math.floor((currentPage - 1) / pageWindowSize) * pageWindowSize + 1;
  const currentWindowEnd = Math.min(currentWindowStart + pageWindowSize - 1, totalPages);

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Words Data</h2>

      {/* Search by ID */}
      <input
        type="number"
        placeholder="Search by ID..."
        className="border p-2 rounded w-full max-w-md mb-4 shadow"
        value={searchId}
        onChange={(e) => {
          setSearchId(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && filteredData.length === 0 && (
        <p className="text-red-500 text-lg">No matching records found</p>
      )}

      {!loading && !error && currentItems.length > 0 && (
        <>
          <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Headword</th>
                <th className="py-2 px-4 text-left">Entry Type</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.headword}</td>
                  <td className="py-2 px-4">{item.entrytype}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-4 gap-2">

            {/* Left arrow ← (previous 10 pages) */}
            {currentWindowStart > 1 && (
              <button
                onClick={() => goToPage(currentWindowStart - 1)}
                className="px-3 py-1 border rounded hover:bg-gray-200"
              >
                ←
              </button>
            )}

            {/* Page Numbers (only 10 visible) */}
            {[...Array(currentWindowEnd - currentWindowStart + 1)].map((_, index) => {
              const pageNum = currentWindowStart + index;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Right arrow → (next 10 pages) */}
            {currentWindowEnd < totalPages && (
              <button
                onClick={() => goToPage(currentWindowEnd + 1)}
                className="px-3 py-1 border rounded hover:bg-gray-200"
              >
                →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
