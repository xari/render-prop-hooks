import { BaseTable, StyledTable, StyledTableUsingHook } from "./demo/simple";
import {
  StyledTable as StyledTable2d,
  StyledTableWithExpandableAndRowSelection,
  TableWithExpandable,
  TableWithRowSelection,
} from "./demo/2d";

import { StyledTableWithRowSelectionAndInlineButtons } from "./demo/3d";

import styles from "./styles.module.css";

export default function Demo() {
  return (
    <div className={styles.wrapper}>
      <h1>1d</h1>

      <ul>
        <li>
          <h2>BaseTable</h2>
          <BaseTable />
        </li>
        <li>
          <h2>StyledTable</h2>
          <StyledTable />
        </li>
        <li>
          <h2>StyledTableUsingHook</h2>
          <StyledTableUsingHook />
        </li>
      </ul>

      <h1>2d</h1>

      <ul>
        <li>
          <h2>StyledTable2d</h2>
          <StyledTable2d />
        </li>
        <li>
          <h2>TableWithRowSelection</h2>
          <TableWithRowSelection />
        </li>
        <li>
          <h2>TableWithExpandable</h2>
          <TableWithExpandable />
        </li>
        <li>
          <h2>StyledTableWithExpandableAndRowSelection</h2>
          <StyledTableWithExpandableAndRowSelection />
        </li>
      </ul>

      <h1>3d</h1>

      <ul>
        <li>
          <h2>StyledTableWithRowSelectionAndInlineButtons</h2>
          <StyledTableWithRowSelectionAndInlineButtons />
        </li>
      </ul>
    </div>
  );
}
