import React from "react";

export function DataTable({ columns, data }) {
    return (
        <table className="min-w-full border-collapse">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={String(col.accessor)} className="px-4 py-2 border-b">
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-100">
                        {columns.map((col) => (
                            <td key={String(col.accessor)} className="px-4 py-2 border-b">
                                {col.render
                                    ? col.render(row[col.accessorKey], row)
                                    : String(row[col.accessorKey])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
