import React, { useState, useEffect } from 'react';
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend
);

const DashboardChart = ({ timeframe }) => {

 const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
 });
 const [noDataMessage, setNoDataMessage] = useState('');

 const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Estadísticas de Créditos y Productores',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: false,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
 };

 useEffect(() => {
  const fetchData = async () => {
     try {
      const creditosRes = await fetch(`http://localhost:3000/stats/creditos/${timeframe}`);
      const creditosData = await creditosRes.json();
      console.log("Creditos Data:", creditosData); // Agrega esta línea

      const productoresRes = await fetch(`http://localhost:3000/stats/productores/${timeframe}`);
      const productoresData = await productoresRes.json();
      console.log("Productores Data:", productoresData); // Agrega esta línea
 
        // Formatear las etiquetas según el timeframe
        let labels;
        switch (timeframe) {
          case 'dia':
            labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']; // Ejemplos de días
            break;
          case 'semana':
            labels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4']; // Ejemplos de semanas
            break;
          case 'mes':
            labels = ['Enero', 'Febrero', 'Marzo', 'Abril']; // Ejemplos de meses
            break;
          default:
            labels = [];
        }

       const datasets = [
         {
           label: 'Creditos',
           data: creditosData.map(item => item.count),
           borderColor: 'rgb(255, 99, 132)',
           backgroundColor: 'rgba(255, 99, 132, 0.5)',
           yAxisID: 'y',
         },
         {
           label: 'Productores',
           data: productoresData.map(item => item.count),
           borderColor: 'rgb(53, 162, 235)',
           backgroundColor: 'rgba(53, 162, 235, 0.5)',
           yAxisID: 'y1',
         },
       ];
 
       setChartData({ labels, datasets });
     } catch (error) {
       console.error('Error fetching chart data:', error);
       setNoDataMessage('Error al cargar los datos.');
     }
  };
 
  fetchData();
 }, [timeframe]);

 if (noDataMessage) {
    return <div>{noDataMessage}</div>;
 }

 return (
  <div>
    {noDataMessage ? (
      <div>{noDataMessage}</div>
    ) : (
      <Line key={`${Date.now()}-${timeframe}`} data={chartData} options={options}/>

    )}
  </div>
);
};


export default DashboardChart;