import { ReactNode, useState } from "react";
import { ConfigProvider, Table, TableProps } from "antd";
import { ExpandableConfig, TableRowSelection } from "antd/es/table/interface";

import styles from "./styles.module.css";

type ExampleData = {
  key: string;
  name: string;
  age: number;
  address: string;
};

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

type TableData = {
  key: string;
  value: number;
};

type RowSelectionProps = TableRowSelection<TableData>;

type RenderProp = (
  rowSelection: TableRowSelection<TableData>,
  clearSelectedRows?: () => void,
) => ReactNode;

function WithRowSelection({
  children,
}: RowSelectionProps & {
  children: RenderProp;
}) {
  const [selectedRows, setSelectedRows] = useState<Array<TableData>>([]);

  const selectedRowKeys = selectedRows.map(({ key }) => key);

  const rowSelection: RowSelectionProps = {
    selectedRowKeys,
    onChange: (_keys, rows) => setSelectedRows(rows),
    type: "checkbox",
  };

  return <>{children(rowSelection)}</>; // Why do we need the Fragment?
}

function WithRowSelectionAndButtons({
  children,
  buttonProps,
}: RowSelectionProps & {
  children: RenderProp;
  buttonProps: { onClick: (rowSelection: RowSelectionProps) => void };
}) {
  const [selectedRows, setSelectedRows] = useState<Array<TableData>>([]);

  const clearSelectedRows = () => setSelectedRows([]);

  const selectedRowKeys = selectedRows.map(({ key }) => key);

  const rowSelection: RowSelectionProps = {
    selectedRowKeys,
    onChange: (_keys, rows) => setSelectedRows(rows),
    type: "checkbox",
  };

  return (
    <div className={styles.relativeWrapper}>
      {children(rowSelection, clearSelectedRows)}

      <button
        className={styles.buttonRight}
        onClick={() => buttonProps.onClick(rowSelection)}
      >
        Log selected rows
      </button>
    </div>
  );
}

type AllowedTableProps = Pick<TableProps, "expandable" | "rowSelection">;

function BaseTable(props: AllowedTableProps) {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      {...props}
    />
  );
}

const theme = {
  components: {
    Table: {
      headerBg: "red",
    },
  },
};

function StyledTable(props: AllowedTableProps) {
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

// Second: Giving control of the render back to the parent.
// Benefit: The hook will wrap whatever is passed to it in the ConfigProvider.
function useStyledTableWithChildren(children: ReactNode) {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}

function StyledTableWithHook() {
  const styledTable = useStyledTable();

  return styledTable;
}

function StyledTableWithHookWithChildren() {
  const styledTable = useStyledTableWithChildren(<BaseTable />);

  return styledTable;

  // Or simply:
  // return useStyledTableWithChildren(<BaseTable />)
}

// What about combining features?
// Consider another Table feature: rowSelection.
function useRowSelection() {
  const [selectedRows, setSelectedRows] = useState<Array<TableData>>([]);

  const rowSelection: RowSelectionProps = {
    selectedRowKeys: selectedRows.map(({ key }) => key),
    onChange: (_keys, rows) => setSelectedRows(rows),
    type: "checkbox",
  };

  return rowSelection;
}

function TableWithRowSelectionHook() {
  const rowSelection = useRowSelection();

  return <BaseTable rowSelection={rowSelection} />;
}

// Combining hooks:
function StyledTableWithRowSelection() {
  const rowSelection = useRowSelection();

  return useStyledTableWithChildren(<BaseTable rowSelection={rowSelection} />);
}

// How about adding more features?
function StyledTableWithRowSelectionAndExpandable() {
  const rowSelection = useRowSelection();
  const expandable = useExpandable();

  return useStyledTableWithChildren(
    <BaseTable rowSelection={rowSelection} expandable={expandable} />,
  );
}

function TableWithRowSelection() {
  return (
    <WithRowSelection>
      {(rowSelection) => <BaseTable rowSelection={rowSelection} />}
    </WithRowSelection>
  );
}

function useExpandable(): ExpandableConfig<ExampleData> {
  return {
    expandedRowRender: (record) => (
      <p style={{ margin: 0 }}>{record.address}</p>
    ),
    rowExpandable: (record) => record.name !== "Not Expandable",
  };
}

function TableWithExpandableHook() {
  const expandable = useExpandable();

  return <BaseTable expandable={expandable} />;
}

function _StyledTableWithRowSelection() {
  return (
    <WithRowSelectionAndButtons
      buttonProps={{
        onClick: ({ selectedRowKeys }) => console.log(selectedRowKeys),
      }}
    >
      {(rowSelection, clearSelectedRows) => (
        <div className={styles.relativeWrapper}>
          <StyledTable rowSelection={rowSelection} />

          <button className={styles.buttonLeft} onClick={clearSelectedRows}>
            Clear selection
          </button>
        </div>
      )}
    </WithRowSelectionAndButtons>
  );
}

type RenderPropWithReturnedButton = (
  rowSelection: TableRowSelection<TableData>,
  clearSelectedRows: () => void,
  logSelectedRowsButton: ReactNode,
) => ReactNode;

function WithRowSelectionAndReturnedButton({
  children,
  buttonProps,
}: RowSelectionProps & {
  children: RenderPropWithReturnedButton;
  buttonProps: { onClick: (rowSelection: RowSelectionProps) => void };
}) {
  const [selectedRows, setSelectedRows] = useState<Array<TableData>>([]);

  const clearSelectedRows = () => setSelectedRows([]);

  const selectedRowKeys = selectedRows.map(({ key }) => key);

  const rowSelection: RowSelectionProps = {
    selectedRowKeys,
    onChange: (_keys, rows) => setSelectedRows(rows),
    type: "checkbox",
  };

  return (
    <div className={styles.relativeWrapper}>
      {children(
        rowSelection,
        clearSelectedRows,
        <button
          className={styles.buttonRight}
          onClick={() => buttonProps.onClick(rowSelection)}
        >
          Log selected rows
        </button>,
      )}
    </div>
  );
}

function StyledTableWithRowSelectionAndInlineButtons() {
  return (
    <WithRowSelectionAndReturnedButton
      buttonProps={{
        onClick: ({ selectedRowKeys }) => console.log(selectedRowKeys),
      }}
    >
      {(rowSelection, clearSelectedRows, logSelectedRowsButton) => (
        <div className={styles.relativeWrapper}>
          <StyledTable rowSelection={rowSelection} />

          <button className={styles.buttonLeft} onClick={clearSelectedRows}>
            Clear selection
          </button>
          {logSelectedRowsButton}
        </div>
      )}
    </WithRowSelectionAndReturnedButton>
  );
}

export default function Demo() {
  return (
    <div className={styles.wrapper}>
      <h1>BaseTable</h1>
      <BaseTable />
      <h1>StyledTable</h1>
      <StyledTable />
      <h1>StyledTableWithHook</h1>
      <StyledTableWithHook />
      <h1>StyledTableWithHookWithChildren</h1>
      <StyledTableWithHookWithChildren />
      <h1>TableWithRowSelectionHook</h1>
      <TableWithRowSelectionHook />
      <h1>StyledTableWithRowSelection</h1>
      <StyledTableWithRowSelection />
      <h1>StyledTableWithRowSelectionAndExpandable</h1>
      <StyledTableWithRowSelectionAndExpandable />
      <h1>TableWithExpandableHook</h1>
      <TableWithExpandableHook />
      <h1>TableWithRowSelectionHook</h1>
      <TableWithRowSelectionHook />
      <h1>TableWithRowSelection</h1>
      <TableWithRowSelection />
      <h1>StyledTableWithRowSelectionAndInlineButtons</h1>
      <StyledTableWithRowSelectionAndInlineButtons />
    </div>
  );
}
