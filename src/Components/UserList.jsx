import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";


export default function BasicTable({users,onEdit, setOpen, setOpenDeleteDialog}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
             <TableCell>S.No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Phone</TableCell>
            <TableCell >Actions</TableCell>    
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{index+1}</TableCell>
              <TableCell component="th" scope="row">
                {row.firstName} {row.lastName}
              </TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.phone}</TableCell>
              <TableCell >
                <FaRegEdit onClick={() => {onEdit(row), setOpen(true)}} style={{ cursor: "pointer", marginRight: 10 , fontSize:20}} />
                <MdOutlineDelete onClick={() => {onEdit(row), setOpenDeleteDialog(true)}} style={{ cursor: "pointer",fontSize:20 }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
