import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useTheme } from "../Context/ThemeContext";

const UserDataTable = ({ data }) => {
  const { theme } = useTheme();
  const cellStyle = { color: theme.title, textAlign: "center" };

  const [visibleRows, setVisibleRows] = useState(20);

  const handleShowMore = () => {
    setVisibleRows((prevVisibleRows) => prevVisibleRows + 20);
  };

  return (
    <div className="table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>WPM</TableCell>
              <TableCell style={cellStyle}>Accuracy</TableCell>
              <TableCell style={cellStyle}>Characters</TableCell>
              <TableCell style={cellStyle}>Date & Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, visibleRows).map((rowData, i) => (
              <TableRow key={i}>
                <TableCell style={cellStyle}>{rowData.wpm}</TableCell>
                <TableCell style={cellStyle}>{rowData.accuracy}</TableCell>
                <TableCell style={cellStyle}>{rowData.characters}</TableCell>
                <TableCell style={cellStyle}>
                  {rowData.timeStamp.toDate().toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {visibleRows < data.length && (
        <Button onClick={handleShowMore} variant="contained">
          Show More
        </Button>
      )}
    </div>
  );
};

export default UserDataTable;
