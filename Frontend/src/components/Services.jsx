import { useQuery } from "@tanstack/react-query";
import {
  Container,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import UpdateServiceButton from "./UpdateServicesButton";
import DeleteServiceButton from "./DeleteServiceButton";
import AddServiceButton from "./AddServiceButton";

const fetchServices = async () => {
  const response = await fetch("http://127.0.0.1:8000/services", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log("Fetched data:", data);
  return data;
};

const Services = () => {
  const {
    data: servicesData,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    select: (data) => {
      console.log("Selecting data:", data);
      return Array.isArray(data.data) ? data.data : [];
    },
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <p>Error fetching services: {error.message}</p>;
  }

  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <div className="mb-4">
        <AddServiceButton refetch={refetch} />
      </div>

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
              tableLayout: "auto",
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
                Duration
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
            {Array.isArray(servicesData) && servicesData.length > 0 ? (
              servicesData.map((service) => (
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
                  <TableCell align="right" sx={{ color: "#333" }}>
                    {service.duration} minutes
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
                    <UpdateServiceButton
                      serviceId={service.id}
                      refetch={refetch}
                    />
                    <DeleteServiceButton
                      serviceId={service.id}
                      refetch={refetch}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No services found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Services;
