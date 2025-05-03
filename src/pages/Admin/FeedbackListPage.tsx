import React from "react";
import { useNavigate } from "react-router";
import { Feedback } from "../../models/feedback";
import { fetchFeedbacks } from "../../services/feedbacksService";
import { toast } from "react-toastify";
import {
  MdChevronLeft,
  MdChevronRight,
  MdStar,
  MdVisibility,
} from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Feedback>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Rating",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <MdStar
              key={i}
              className={`w-3 h-3 ${
                i < row.original.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      );
    },
  }),
  columnHelper.accessor("message", {
    header: () => "Message",
    cell: (info) =>
      info.getValue().length > 50
        ? `${info.getValue().substring(0, 50)}...`
        : info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Date",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => <ActionCell id={row.original._id ?? ""} />,
  }),
];

const ActionCell: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/admin/feedbacks/${id}`)}
      className="inline-flex cursor-pointer items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <MdVisibility className="w-4 h-4 mr-1" /> View
    </button>
  );
};

const FeedbackListPage: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const { data, isLoading, error } = useQuery<Feedback[], Error>({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });
  const table = useReactTable({
    data: data ?? [],
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  React.useEffect(() => {
    if (error) {
      toast.error("Failed to load feedbacks");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-132px)] flex items-center justify-center mx-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 w-full md:w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Customer Feedbacks</h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the customer feedback you&apos;ve received
        </p>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {!data || error ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              No feedbacks yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              When customers submit feedback, they will appear here.
            </p>
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider select-none cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center space-x-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <MdChevronLeft className="w-4 h-4 rotate-90" />
                            ),
                            desc: (
                              <MdChevronRight className="w-4 h-4 rotate-90" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={
                            cell.column.id === "message"
                              ? "text-sm text-gray-900 truncate max-w-xs"
                              : "text-sm text-gray-900"
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-6 py-3 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  {"<<"}
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  {">>"}
                </button>
              </div>

              <span className="text-sm text-gray-700">
                Page{" "}
                <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
                <strong>{table.getPageCount()}</strong>
              </span>

              <div className="flex items-center space-x-2">
                <label htmlFor="pageSize" className="text-sm text-gray-700">
                  Show:
                </label>
                <select
                  id="pageSize"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[8, 16, 32, 64].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackListPage;
