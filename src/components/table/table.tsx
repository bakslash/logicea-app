import React, { useEffect, useState } from "react";
import MUIDataTable, {
  MUIDataTableOptions,
  FilterType,
  SelectableRows,
  MUIDataTableColumn,
} from "mui-datatables";
import Loader from "../loader/loader";
import { Link } from "react-router-dom";

interface CustomTableColumn extends MUIDataTableColumn {
  field: string;
}

interface TableProps {
  loading: boolean;
  data: any[];
  columns: CustomTableColumn[];
  title?: string;
  count: number;
  setPage: (page: number) => void;
  page: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  option?: MUIDataTableOptions & {
    filterType?: FilterType;
    selectableRows?: SelectableRows;
  };
}

const Table: React.FC<TableProps> = ({
  loading,
  data,
  columns = [],
  title = "Table Title",
  count = data.length,
  setPage,
  page,
  setRowsPerPage,
  option,
}) => {
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);


  

  const handleColumnSortChange = (changedColumn: string, direction: string) => {
    const sortedData = [...tableData].sort((a, b) => {
      const column = columns.find((col) => col.name === changedColumn) as CustomTableColumn;
      if (column) {
        if (column.field === "Number of Views") {
          const viewsA = a[column.field] || 0;
          const viewsB = b[column.field] || 0;
          return direction === "asc" ? viewsA - viewsB : viewsB - viewsA;
        } else if (column.field === "Created Date") {
          const dateA = new Date(a[column.field]);
          const dateB = new Date(b[column.field]);
          return direction === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        } else {
          const valueA = String(a[column.field]);
          const valueB = String(b[column.field]);
          return direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
      }
      return 0;
    });

    setTableData(sortedData);
  };

  const options: MUIDataTableOptions = {
    filter: true,
    filterType: "multiselect",
    responsive: "vertical",
    ...option,
    rowsPerPageOptions: [5, 10],
    page,
    sort: true,
    onColumnSortChange: handleColumnSortChange,
    textLabels: {
      body: {
        noMatch: loading ? <Loader loading={loading} /> : null,
      },
    },
  };

  

  return (
    <>
      {loading && <Loader loading={loading} />}
      <MUIDataTable
        title={''}
        data={tableData}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default Table;
