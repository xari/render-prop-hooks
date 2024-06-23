import { TableProps } from "antd";
import { TableRowSelection } from "antd/es/table/interface";

export type AllowedTableProps = Pick<TableProps, "expandable" | "rowSelection">;

export type TableData = {
  key: string;
  value: number;
};

export type RowSelectionProps = TableRowSelection<TableData>;

export type ExampleData = {
  key: string;
  name: string;
  age: number;
  address: string;
};

