import { useEffect, useState } from "react";
import { supabase } from "../utils/Supabase";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Barbers = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const { data, error } = await supabase.from("barbers").select("*");
        if (error) {
          throw error;
        }
        setBarbers(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching barbers");
        setLoading(false);
      }
    };
    fetchBarbers();
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        padding: 2,
        margin: 0,
        width: "100vw",
        boxSizing: "border-box",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 800, maxHeight: 800 }}
        >
          <Table aria-label="Barbers Table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>First Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>
                  <strong>Bio</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {barbers.map((barber, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell>{barber.first_name}</TableCell>
                  <TableCell>{barber.last_name}</TableCell>
                  <TableCell>{barber.phone}</TableCell>
                  <TableCell>{barber.bio}</TableCell>
                  <TableCell>{barber.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Barbers;
