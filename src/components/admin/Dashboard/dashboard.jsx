import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import MainChart from './chart';
import ColumnChart from './columnChart';
import { AdminDashboard } from '../../../Api/AdminAPI';
import Loader from '../../Loader';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [mChartData, setMChartData] = useState();
  const [CChartData, setCChartData] = useState();
  const [loading, setLoading] = useState(true);


  const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

  useEffect(() => {
    AdminDashboard(headers).then((res) => {
      setLoading(false)

      const { users, providers,totalBookings,earnings } = res.data;
      const namedData = [
        { name: 'Earnings', count: earnings }, 
        { name: 'Bookings', count: totalBookings }, 
        { name: 'Users', count: users },
        { name: 'Providers', count: providers }
      ];
      setData(namedData);
      setMChartData(res.data.earningsByMonth)
      setCChartData(res.data.bookingsCountByMonth)
    });
  }, []);

  return (
    <>
      <div className='flex justify-center mt-10'>
       {loading ?
        <Loader />: <div>
          <div>
            <h1 className='text-2xl font-semibold'>Dashboard</h1>
            <StatCard value={data} />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5 md:mx-0 mx-2'>
            <MainChart value={mChartData}/>
            <ColumnChart value={CChartData} />
          </div>
        </div>}
      </div>
    </>
  );
};

export default Dashboard;
