import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
  UnfoldMore,
  UnfoldLess,
} from '@material-ui/icons';
import { useTable, useGroupBy, useExpanded } from 'react-table';

import FakeData from '../fake-data/fake-data';


function ExpensesTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  },
  useGroupBy,
  useExpanded,
  );

  // Render the UI for your table
  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
                {column.canGroupBy ? (<span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? (<ChevronRight/>) : (<ChevronLeft/>)}
                    </span>): null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.isGrouped ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        <span {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? (<UnfoldLess/>) : (<UnfoldMore/>)}
                        </span>{' '}
                        {cell.render('Cell')} ({row.subRows.length})
                      </>
                    ) : cell.isAggregated ? (
                      // If the cell is aggregated, use the Aggregated
                      // renderer for cell
                      cell.render('Aggregated')
                    ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                      // Otherwise, just render the regular cell
                      cell.render('Cell')
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

function Expenses() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                aggregate: 'uniqueCount',
                Aggregated: ({ value }) => `${value} unique names`,

            },
            {
                Header: 'Amount',
                accessor: 'amount',
                aggregate: 'sum',
                Aggregated: ({ value }) => `${value.toFixed(2)} in total`,
                disableGroupBy: true,
            },
            {
                Header: 'Date',
                accessor: ({date}) => date.toLocaleDateString(),
                aggregate: (values) => {
                let min = values[0] || 0;
                let max = values[0] || 0;
              
                values.forEach(value => {
                    min = min > value ? value : min;
                    max = max < value ? value : max;
                });
              
                return [min, max];
              },
                Aggregated: ({value}) => {
                  const [min, max] = value;
                  return min === max ? `On ${min}` : `From ${min} to ${max}`;
                },
            },
            {
                Header: 'Category',
                accessor: 'category',
                aggregate: 'uniqueCount',
                Aggregated: ({ value }) => `In ${value} categories`,
            }
        ],
        []
    );

  const data = React.useMemo(() => FakeData, [])

  return (
    <div>
      <ExpensesTable columns={columns} data={data} />
    </div>
  )
}

export default Expenses;
