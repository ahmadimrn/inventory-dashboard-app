import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../services/api/axios";

const Products = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        stock: "",
    });
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        try {
            const res = await api.get("/products");
            setRows(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        try {
            const payload = {
                name: form.name,
                price: parseInt(form.price),
                stock: parseInt(form.stock),
                category: form.category,
            };
            const res = await api.post("/products", payload);
            setRows((prev) => [...prev, res.data.data]);
            setOpen(false);
            setForm({ name: "", price: "", stock: "", category: "" });
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create product");
        }
    };

    const handleCellEditCommit = async (params) => {
        const { id, field, value } = params;
        try {
            await api.patch(`/products/${id}`, { [field]: value });
            setRows((prev) =>
                prev.map((row) =>
                    row.id === id ? { ...row, [field]: value } : row
                )
            );
        } catch (err) {
            console.error("Failed to update product:", err);
        }
    };

    const handleDelete = async () => {
        try {
            const idsToDelete = Array.from(rowSelectionModel.ids || []);

            if (idsToDelete.length === 0) return;

            await Promise.all(
                idsToDelete.map((id) => api.delete(`/products/${id}`))
            );

            setRows((prev) =>
                prev.filter((row) => !idsToDelete.includes(row.id))
            );

            setRowSelectionModel({ type: "include", ids: new Set() });
        } catch (err) {
            console.error("Failed to delete:", err);
        }
    };

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            editable: false,
        },

        {
            field: "price",
            headerName: "Price ($)",
            type: "number",
            flex: 1,
            editable: false,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            flex: 1,
            editable: false,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            editable: false,
        },
    ];

    return (
        <Container sx={{ width: "90%", mt: 5 }}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="h5" fontWeight={600}>
                    Products
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete Selected
                    </Button>
                    <Button variant="outlined" onClick={() => setOpen(true)}>
                        Create Product
                    </Button>
                </Stack>
            </Stack>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ height: 520 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        loading={loading}
                        getRowId={(row) => row.id}
                        checkboxSelection
                        onRowSelectionModelChange={(newSelection) => {
                            setRowSelectionModel(newSelection);
                        }}
                        disableRowSelectionOnClick
                        pageSizeOptions={[10, 25, 50]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        experimentalFeatures={{ newEditingApi: true }}
                        onCellEditCommit={handleCellEditCommit}
                        sx={{
                            border: 0,
                            borderRadius: 3,
                        }}
                    />
                </Box>
            </Paper>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Stock"
                            name="stock"
                            type="number"
                            value={form.stock}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            select
                            label="Category"
                            name="category"
                            value={form.category || " "}
                            onChange={handleChange}
                        >
                            {[
                                "Electronics",
                                "Hardware",
                                "Furniture",
                                "Office Supplies",
                                "Raw Materials",
                            ].map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>

                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreate}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Products;
