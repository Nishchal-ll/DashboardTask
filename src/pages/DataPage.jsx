import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/apiSlice";

export default function DataPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter the data based on search input
  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.address.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Users Data</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, email, city..."
        className="border p-2 rounded w-full max-w-md mb-4 shadow"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loading State */}
      {loading && <p className="text-blue-600">Loading...</p>}

      {/* Error State */}
      {error && <p className="text-red-600">{error}</p>}

      {/* User Not Found */}
      {!loading && filteredData.length === 0 && (
        <p className="text-red-500 text-lg">User not found</p>
      )}

      {/* Data Table */}
      {!loading && !error && filteredData.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">City</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
