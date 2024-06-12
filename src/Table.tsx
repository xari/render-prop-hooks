import { ReactNode, useState } from "react";
import { ConfigProvider, Table, TableProps } from "antd";
import { TableRowSelection } from "antd/es/table/interface";

type TableData = {
	key: string;
	value: number;
};

type RowSelectionProps = TableRowSelection<TableData>;

type RenderProp = (
	rowSelection: TableRowSelection<TableData>,
	clearSelectedRows?: () => void
) => ReactNode;

function WithRowSelection({
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
		<div style={{ position: "relative" }}>
			{children(rowSelection, clearSelectedRows)}

			<button
				onClick={() =>
					buttonProps.onClick(rowSelection)
				}
				style={{
					position: "absolute",
					bottom: 0,
					right: 0,
				}}
			>
				Log selected rows
			</button>
		</div>
	);
}

function StyledTable(props: Pick<TableProps, "dataSource" | "rowSelection">) {
	const { dataSource, rowSelection } = props;

	return (
		<ConfigProvider theme={{ hashed: false }}>
			<Table
				dataSource={dataSource}
				rowSelection={rowSelection}
			/>
		</ConfigProvider>
	);
}

const dataSource = [
	{
		key: "sherlock",
		value: 123,
	},
	{
		key: "moriarty",
		value: 456,
	},
];

function StyledTableWithRowSelection() {
	return (
		<WithRowSelection
			buttonProps={{
				onClick: ({ selectedRowKeys }) =>
					console.log(selectedRowKeys),
			}}
		>
			{(rowSelection, clearSelectedRows) => (
				<div style={{ position: "relative" }}>
					<StyledTable
						dataSource={dataSource}
						rowSelection={rowSelection}
					/>

					<button
						onClick={clearSelectedRows}
						style={{
							position: "absolute",
							bottom: 0,
							left: 0,
						}}
					>
						Clear selection
					</button>
				</div>
			)}
		</WithRowSelection>
	);
}

export default function Demo() {
	return (
		<>
			<Table dataSource={dataSource} />
			<StyledTable dataSource={dataSource} />
			<StyledTableWithRowSelection />
		</>
	);
}
