import React from "react";
import { useTable, usePagination } from "react-table";

export default function Table({ columns, data }) {
 const tableInstance = useTable({ columns, data });

 const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
   tableInstance;

 return (

   <table {...getTableProps()}>
     <thead>
       {
         headerGroups.map((headerGroup) => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {

               headerGroup.headers.map((column) => (
    
                 <th {...column.getHeaderProps()}>
                   {
                     column.render("Header")
                   }
                 </th>
               ))
             }
           </tr>
         ))
       }
     </thead>
     {/* Apply the table body props */}
     <tbody {...getTableBodyProps()}>
       {
         rows.map((row) => {
           prepareRow(row);
           return (
             <tr {...row.getRowProps()}>
               {
                 row.cells.map((cell) => {
                   return (
                     <td {...cell.getCellProps()}>
                       {
                         // Render the cell contents
                         cell.render("Cell")
                       }
                     </td>
                   );
                 })
               }
             </tr>
           );
         })
       }
     </tbody>
   </table>
 );

}
