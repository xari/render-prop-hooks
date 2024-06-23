import { ReactNode, useState } from "react";
import { TableRowSelection } from "antd/es/table/interface";

import { BaseTable, StyledTable } from "./simple";

import { RowSelectionProps, TableData } from "./types";
import styles from "../styles.module.css";

type RenderProp = (
  rowSelection: TableRowSelection<TableData>,
  clearSelectedRows?: () => void,
) => ReactNode;

type RenderPropWithReturnedButton = (
  rowSelection: TableRowSelection<TableData>,
  clearSelectedRows: () => void,
  logSelectedRowsButton: ReactNode,
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

function _TableWithRowSelection() {
  return (
    <WithRowSelection>
      {(rowSelection) => <BaseTable rowSelection={rowSelection} />}
    </WithRowSelection>
  );
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

export function StyledTableWithRowSelectionAndInlineButtons() {
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
