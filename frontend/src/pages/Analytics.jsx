import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { LineChart, BarChart, PieChart } from "@mui/x-charts";
import api from "../services/api/axios";

const Analytics = () => {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);
    const [inventoryTrend, setInventoryTrend] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get("/analytics");

                const data = res.data.data;

                setSummary(data.summary);
                setInventoryTrend(data.inventoryTrend);
                setCategoryData(data.categoryData);
                setTopProducts(data.topProducts);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="60vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ m: 5 }}>
            <Grid container spacing={2} mb={5}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, borderRadius: 3 }}>
                        <Typography color="text.secondary">
                            Total Inventory Value
                        </Typography>
                        <Typography variant="h5" fontWeight={600}>
                            ${summary.totalValue}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, borderRadius: 3 }}>
                        <Typography color="text.secondary">
                            Low Stock Products
                        </Typography>
                        <Typography variant="h5" fontWeight={600}>
                            {summary.lowStock}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, borderRadius: 3 }}>
                        <Typography color="text.secondary">
                            Out of Stock
                        </Typography>
                        <Typography variant="h5" fontWeight={600}>
                            {summary.outOfStock}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={12} md={6}>
                    <Paper
                        sx={{
                            p: 2,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 3,
                        }}
                    >
                        <Typography mb={2} fontWeight={500}>
                            Inventory Value Over Time
                        </Typography>

                        <LineChart
                            xAxis={[
                                {
                                    scaleType: "point",
                                    data: inventoryTrend.map(
                                        (item) => item.date
                                    ),
                                },
                            ]}
                            series={[
                                {
                                    data: inventoryTrend.map(
                                        (item) => item.value
                                    ),
                                    label: "Inventory Value",
                                },
                            ]}
                            height={300}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper
                        sx={{
                            p: 2,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 3,
                        }}
                    >
                        <Typography mb={2} fontWeight={500}>
                            Category Distribution
                        </Typography>

                        <PieChart
                            series={[
                                {
                                    data: categoryData.map((item, index) => ({
                                        id: index,
                                        value: item.value,
                                        label: item.category,
                                    })),
                                },
                            ]}
                            height={300}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 3,
                        }}
                    >
                        <Typography mb={2} fontWeight={500}>
                            Top Products by Inventory Value
                        </Typography>

                        <BarChart
                            xAxis={[
                                {
                                    scaleType: "band",
                                    data: topProducts.map((p) => p.name),
                                },
                            ]}
                            series={[
                                {
                                    data: topProducts.map((p) => p.value),
                                    label: "Value",
                                },
                            ]}
                            height={300}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Analytics;
