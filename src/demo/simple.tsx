import { ConfigProvider, Table } from "antd";
import { AllowedTableProps } from "./types";
import { columns, dataSource, theme } from "./data";

export function BaseTable(props: AllowedTableProps) {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      {...props}
    />
  );
}

export function StyledTable(props: AllowedTableProps) {
  return (
    <ConfigProvider theme={theme}>
      <BaseTable {...props} />
    </ConfigProvider>
  );
}

// Using a hook: 2 ways
// First: The hook renders the children.
// Constraint: The hook can only render one thing.
function useStyledTable(props?: AllowedTableProps) {
  return (
    <ConfigProvider theme={theme}>
      <BaseTable {...props} />
    </ConfigProvider>
  );
}

// This isn't very helpful, but arguably it might serve to
// clean-up a larger component by breaking it into smaller parts.
export function StyledTableUsingHook() {
  const styledTable = useStyledTable();

  return styledTable;
}
