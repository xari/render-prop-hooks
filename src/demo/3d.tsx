import { ReactNode, useState } from "react";
import { TableRowSelection } from "antd/es/table/interface";

import { BaseTable, StyledTable } from "./simple";

import { RowSelectionProps, TableData } from "./types";
import styles from "../styles.module.css";

// What now?
// We know how to use multiple
// features/hooks in a single component.
// What about rendering custom markup?

import { useExpandable, useRowSelection, useTableStyles } from "./2d";

// "The Media Object pattern is:
// image thingy on the left,
// heading and text on the right."
// - https://css-tricks.com/media-object-bunch-ways/

function MediaObject({
	media,
	heading,
	text,
}: Record<"media" | "heading" | "text", ReactNode>) {
	return (
		<div className="flex">
			{media}
			<div className="flex flex-col">
				{heading}
				{text}
			</div>
		</div>
	);
}

function TableObject() {
	const expandable = useExpandable();
	const rowSelection = useRowSelection();

	const table = useTableStyles(
		<BaseTable
			expandable={expandable}
			rowSelection={rowSelection}
		/>
	);

	const heading = "My table object";
	const text = "Pretty sweet, huh?";

	return <MediaObject media={table} heading={heading} text={text} />;
}

// But why not make the `text` section simply use the `children` prop?

function MediaObjectWithChildren({
	media,
	heading,
	children,
}: Record<"media" | "heading" | "children", ReactNode>) {
	return (
		<div className="flex">
			{media}
			<div className="flex flex-col">
				{heading}
				{children}
			</div>
		</div>
	);
}

function TableObject2ElectricBoogaloo() {
	const expandable = useExpandable();
	const rowSelection = useRowSelection();

	const table = useTableStyles(
		<BaseTable
			expandable={expandable}
			rowSelection={rowSelection}
		/>
	);

	const media = (
		<img src="https://appenzellerbier.ch/bundles/scherrermediengmbhcontaolochertheme/theme22/icons/logo-embleme.svg" />
	);
	const heading = "Production by month";

	return (
		<MediaObjectWithChildren media={media} heading={heading}>
			{table}
		</MediaObjectWithChildren>
	);
}

// So what's the big deal?

function BrewingHighlights() {
	return (
		<MediaObjectWithChildren
			media="https://appenzellerbier.ch/assets/images/8/Dachmarke_1440x600-68340991.png"
			heading="UI Inception"
		>
			{<TableObject2ElectricBoogaloo />}
		</MediaObjectWithChildren>
	);
}

// Or...

function BringingItTogether() {
	const expandable = useExpandable();
	const rowSelection = useRowSelection();

	const table = useTableStyles(
		<BaseTable
			expandable={expandable}
			rowSelection={rowSelection}
		/>
	);

	return (
		<MediaObjectWithChildren
			media="https://appenzellerbier.ch/assets/images/8/Dachmarke_1440x600-68340991.png"
			heading="UI Inception"
		>
			<MediaObjectWithChildren
				media="https://appenzellerbier.ch/bundles/scherrermediengmbhcontaolochertheme/theme22/icons/logo-embleme.svg"
				heading="Production by month"
			>
				{table}
			</MediaObjectWithChildren>
		</MediaObjectWithChildren>
	);
}

// "React lets you build user interfaces out of individual pieces called components.
// Create your own React components like Thumbnail, LikeButton, and Video.
// Then combine them into entire screens, pages, and apps."
