import React, { useEffect, useState } from 'react'
import StatCard from '../admin/Dashboard/StatCard'
import MainChart from '../admin/Dashboard/chart'
import DashboardTable from '../admin/Dashboard/table'
import { providerDashboard, upcoming } from '../../Api/providerAPI'

function Dashboard() {
  const [data, setData] = useState([]);
  const [mChartData, setMChartData] = useState();
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const headers = { Authorization: `Bearer ${localStorage.getItem('ProviderToken')}` };

  useEffect(() => {
    providerDashboard(headers).then((res) => {
      const { Upcoming, Requests, completed, earnings,earningsByMonth } = res.data;
      const namedData = [
        { name: 'Earnings', count: earnings },
        { name: 'Completed', count: completed },
        { name: 'Upcomings', count: Upcoming },
        { name: 'Requests', count: Requests },
      ];
      setData(namedData);
      setMChartData(earningsByMonth)
      upcoming(headers).then((res) => { 
        setUpcomingBookings(res.data)
      })
    })
  }, [])

  return (
    <>
      <div className='flex justify-center mt-10'>
        <div>
          <div>
            <StatCard value={data} />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5 md:mx-0 mx-3'>
            <MainChart  value={mChartData}/>
            <DashboardTable value={upcomingBookings}/>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard