import React, { useMemo } from 'react'
import { useTable , useGlobalFilter, useFilters  , usePagination} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
// import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { CSVLink, CSVDownload } from "react-csv";



export const Pagination = () => {
  
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const defaultColumn = useMemo(() => {
      return{
      Filter: ColumnFilter
    }
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
  } = useTable({
    columns,
    data,
    defaultColumn
  }, useFilters, useGlobalFilter , usePagination)

  const {pageIndex, pageSize} = state

  return (
    <>
   
         
    
  

   <div className="container mt-4">
      
      
   <div class="container m-4">
  <div class="row">
    <div class="col-sm">
       <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
              {
              [10, 25, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}> Show {pageSize} Rows </option>
              ))
            }
      </select>
    </div>
    <div class="col-sm">
     <h3> <small className="text-muted">
</small> </h3>
    </div>
    <div class="col-sm">
      <span className="goto">
           Go to pages :  {''}
            <input type='number' defaultValue={pageIndex +1} onChange={e => {
               const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0 
               gotoPage(pageNumber)
            }} style={{
              width: 75,
            }}/>
          </span>
    </div>
  </div>
</div>
      
     
      
      
      
      
      <div class="container">
  <div class="row">
    <div class="col table-data">
    <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr> 
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    
    <div class="w-100"></div>
    
<div class="row">
    <div class="col">
    <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        <span>
        page {''}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </span>
      
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
      
      </div>
      </div>
      <div class="col mt-2">
      <CSVLink data={data} filename="data.csv"><button type="button" class="btn btn-outline-success  btn-sm">Download CSV</button></CSVLink>
      </div>
    </div>
  </div>
</div>
      
      
     
    </>
  )
}