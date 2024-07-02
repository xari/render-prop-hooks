import { ReactNode, useState } from "react";
import { ConfigProvider } from "antd";
import { ExpandableConfig } from "antd/es/table/interface";

import { ExampleData, RowSelectionProps, TableData } from "./types";
import { BaseTable } from "./simple";
import { theme } from "./data";

// Using the children prop

// Giving control of the render back to the parent.
// Benefit: The hook will wrap whatever is passed to it in the ConfigProvider.
export function useTableStyles(children: ReactNode) {
	return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}

export function StyledTable() {
	const styledTable = useTableStyles(<BaseTable />);

	return styledTable;

	// Or simply:
	// return useTableStyles(<BaseTable />)
}

// Consider another Table feature: rowSelection.
export function useRowSelection() {
	const [selectedRows, setSelectedRows] = useState<Array<TableData>>([]);

	const rowSelection: RowSelectionProps = {
		selectedRowKeys: selectedRows.map(({ key }) => key),
		onChange: (_keys, rows) => setSelectedRows(rows),
		type: "checkbox",
	};

	return rowSelection;
}

export function TableWithRowSelection() {
	const rowSelection = useRowSelection();

	return <BaseTable rowSelection={rowSelection} />;
}

// How about adding another feature?
export function useExpandable(): ExpandableConfig<ExampleData> {
	return {
		expandedRowRender: (record) => (
			<p style={{ margin: 0 }}>{record.address}</p>
		),
		rowExpandable: (record) => record.name !== "Not Expandable",
	};
}

export function TableWithExpandable() {
	const expandable = useExpandable();

	return <BaseTable expandable={expandable} />;
}

export function StyledTableWithExpandableAndRowSelection() {
	const expandable = useExpandable();
	const rowSelection = useRowSelection();

	return useTableStyles(
		<BaseTable
			expandable={expandable}
			rowSelection={rowSelection}
		/>
	);
}
