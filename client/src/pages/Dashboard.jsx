// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DashboardChart from '../components/DashboardChart';
import DashboardHistory from '../components/DashboardHistory';

const Dashboard = () => {
 const [productoresCount, setProductoresCount] = useState(0);
 const [creditosCount, setCreditosCount] = useState(0);
 const [tecnicosCount, setTecnicosCount] = useState(0);
 const [timeframe, setTimeframe] = useState('dia');

 useEffect(() => {
    // Fetch counts from the backend
    const fetchCounts = async () => {
      try {
        const productoresRes = await fetch('http://localhost:3000/stats/productores');
        const creditosRes = await fetch('http://localhost:3000/stats/creditos');
        const tecnicosRes = await fetch('http://localhost:3000/stats/tecnicos');

        const productoresData = await productoresRes.json();
        const creditosData = await creditosRes.json();
        const tecnicosData = await tecnicosRes.json();

        setProductoresCount(productoresData.count);
        setCreditosCount(creditosData.count);
        setTecnicosCount(tecnicosData.count);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
 }, []);

 const handleTimeframeChange = (newTimeframe) => {
  setTimeframe(newTimeframe);
};

 return (
    <Grid container spacing={3}>
      {/* Productores Registrados */}
      <Grid item xs={12} sm={6} md={4}>
      <Card style={{ margin: '16px', padding: '16px' }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <PeopleIcon /> Productores Registrados
            </Typography>
            <Typography variant="h5" component="h2">
              {productoresCount} Productores
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Creditos Asignados */}
      <Grid item xs={12} sm={6} md={4}>
      <Card style={{ margin: '16px', padding: '16px' }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <AttachMoneyIcon /> Creditos Asignados
            </Typography>
            <Typography variant="h5" component="h2">
              {creditosCount} Créditos registrados
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Técnicos Registrados */}
      <Grid item xs={12} sm={6} md={4}>
      <Card style={{ margin: '16px', padding: '16px' }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <EngineeringIcon /> Técnicos Registrados
            </Typography>
            <Typography variant="h5" component="h2">
              {tecnicosCount} Técnicos registrados
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Dashboard Chart */}
      <Grid item xs={12} md={6}>
      <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleTimeframeChange('dia')}
                style={{
                  marginRight: '8px',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(94, 114, 228, 0.1)', 
                  },
                  }}
              >
                Día
              </Button>
              <Button
              
                variant="outlined"
                color="primary"
                onClick={() => handleTimeframeChange('semana')}
                style={{
                  marginRight: '8px',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(94, 114, 228, 0.1)', 
                  },
                  }}
              >
                Semana
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleTimeframeChange('mes')}
                style={{
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(94, 114, 228, 0.1)', 
                  },
                  }}
              >
                Mes
              </Button>
            </Box>
            <DashboardChart timeframe={timeframe} />
          </CardContent>
        </Card>
      </Grid>

      {/* Dashboard History */}
      <Grid item xs={12} md={6}>
        <DashboardHistory />
      </Grid>
    </Grid>
 );
};

export default Dashboard;