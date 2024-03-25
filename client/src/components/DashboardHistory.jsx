import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

const DashboardHistory = () => {
 const [history, setHistory] = useState([]);

 useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch('http://localhost:3000/actions/history');
      const data = await res.json();
      setHistory(data);
    };

    fetchHistory();
 }, []);

 return (
  <Card>

    <CardContent>
      <Typography variant="h6" component="div">
        Historial de Acciones
      </Typography>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {history.map((action, index) => (
          <React.Fragment key={index}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
              {action.descripcion} - {new Date(action.fecha).toLocaleString()}
            </li>
            {index < history.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </ul>
    </CardContent>
  </Card>
);
};

export default DashboardHistory;