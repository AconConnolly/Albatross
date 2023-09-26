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

function createData(age, day, weekEnd) {
  return { age, day, weekEnd };
}

const shag = [
  createData("Regular", "$56.00", "$57.00"),
  createData("Senior (65+)", "$41.50", "$57.00"),
  createData("Junior (4-17)", "$34.00", "$34.00"),
  //41.50 and 41.50
];

const maple = [
  createData("Regular", "$56.00", "$63.00"),
  createData("Senior (65+)", "$48.00", "$63.00"),
  createData("Junior (4-17)", "$39.00", "$39.00"),
  //Twighlight 48 and 48
];
const mccall = [
  createData("Regular", "$51.00", "$60.00"),
  createData("Senior (65+)", "$44.00", "$60.00"),
  createData("Junior (4-17)", "$35.50", "$35.50"),
  //Twigh;ight 44 and 44
];
const mccall9 = [
  createData("Regular", "$16.50", "$16.50"),
  createData("Senior (65+)", "$14.50", "$14.50"),
  createData("Junior (4-17)", "$11.50", "$11.50"),
  //Twightlight 10 and 10
];

const earlyBird = [createData("All ages", "$41.50", "$57.00")];

const valley9 = [
  createData("Regular", "$28.00", "$32.00"),
  createData("Senior (65+)", "$24.00", "$32.00"),
  createData("Junior (4-17)", "$20.00", "$20.00"),
  //18.50 and 18.50
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, marginBottom: 5 }}
        aria-label="customized table"
      >
        <TableHead>
          <Typography variant="h6" component="h6">
            18 Hole
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
          {shag.map((row) => (
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
      </Table>
    </TableContainer>
  );
}
