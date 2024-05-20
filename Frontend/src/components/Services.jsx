import { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import UpdateServiceButton from "../components/UpdateServicesButton";
import DeleteServiceButton from "../components/DeleteServiceButton";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://127.0.0.1:8000/services";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setServices(data.data);
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: 2, width: "100%", overflowX: "auto" }}
      >
        <Table
          sx={{
            minWidth: 650,
            width: "100%",
            "@media (max-width: 750px)": {
              minWidth: "100%",
              tableLayout: "auto", // Allows table to adjust column width based on content
            },
          }}
          aria-label="styled table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                Service
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Price
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "#3f51b5" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow
                key={service.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                }}
              >
                <TableCell component="th" scope="row" sx={{ color: "#333" }}>
                  {service.service}
                </TableCell>
                <TableCell align="right" sx={{ color: "#333" }}>
                  {service.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    minWidth: 160,
                  }}
                >
                  <UpdateServiceButton serviceId={service.id} />
                  <DeleteServiceButton serviceId={service.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Services;
