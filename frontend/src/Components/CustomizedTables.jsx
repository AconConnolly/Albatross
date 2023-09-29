import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// This could read in the data based on the name of the course. Would need to change the create data section

export default function CustomizedTables( {courseData} ) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, marginBottom: 5 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Green Fees</StyledTableCell>
            <StyledTableCell align="right">
              Weekday (Mon. - Thurs.)
            </StyledTableCell>
            <StyledTableCell align="right">
              Weekend (Fri. - Sun. & Holidays)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseData.map((row) => (
            <StyledTableRow key={row.age}>
              <StyledTableCell component="th" scope="row">
                {row.age}
              </StyledTableCell>
              <StyledTableCell align="right">{row.day}</StyledTableCell>
              <StyledTableCell align="right">{row.weekEnd}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      {/* <Table
        sx={{ minWidth: 700, marginBottom: 5 }}
        aria-label="customized table"
      >
        <TableHead>
          <Typography variant="h6" component="h6">
            Early Bird and Twilight
          </Typography>
          <TableRow>
            <StyledTableCell>Green Fees</StyledTableCell>
            <StyledTableCell align="right">
              Weekday (Mon. - Thurs.)
            </StyledTableCell>
            <StyledTableCell align="right">
              Weekend (Fri. - Sun. & Holidays)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {earlyBird.map((row) => (
            <StyledTableRow key={row.age}>
              <StyledTableCell component="th" scope="row">
                {row.age}
              </StyledTableCell>
              <StyledTableCell align="right">{row.day}</StyledTableCell>
              <StyledTableCell align="right">{row.weekEnd}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      <Table
        sx={{ minWidth: 700, marginBottom: 5 }}
        aria-label="customized table"
      >
        <TableHead>
          <Typography variant="h6" component="h6">
            Valley 9
          </Typography>
          <TableRow>
            <StyledTableCell>Green Fees</StyledTableCell>
            <StyledTableCell align="right">
              Weekday (Mon. - Thurs.)
            </StyledTableCell>
            <StyledTableCell align="right">
              Weekend (Fri. - Sun. & Holidays)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {valley9.map((row) => (
            <StyledTableRow key={row.age}>
              <StyledTableCell component="th" scope="row">
                {row.age}
              </StyledTableCell>
              <StyledTableCell align="right">{row.day}</StyledTableCell>
              <StyledTableCell align="right">{row.weekEnd}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table> */}
    </TableContainer>
  );
}
