import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FaUsers, FaParking, FaDollarSign, FaChartLine } from "react-icons/fa"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import annotationPlugin from "chartjs-plugin-annotation"
import datalabels from "chartjs-plugin-datalabels"
import gradient from "chartjs-plugin-gradient"
import zoomPlugin from "chartjs-plugin-zoom"
import axios from "axios"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin,
  datalabels,
  gradient,
  zoomPlugin
)

const AnalyticsContainer = styled.div`
  flex: 1;
  background-color: #f7f8fa;
  font-family: Arial, sans-serif;
  padding: 20px;

`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #333;
  }
`

const DateRange = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 10px;
    font-size: 14px;
    color: #666;
  }

  button {
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
`

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const StatBox = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-right: 0;
  }

  h2 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  p {
    font-size: 24px;
    margin: 10px 0;
    color: #333;
  }

  .increase {
    color: #27ae60;
  }

  .decrease {
    color: #c0392b;
  }

  .neutral {
    color: #f39c12;
  }
`

const Charts = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChartBox = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-right: 0;
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #333;
  }
`

// const revenueData = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     {
//       label: "Revenue",
//       data: [65, 59, 80, 81, 56, 55],
//       backgroundColor: "rgba(75, 192, 192, 0.2)",
//       borderColor: "rgba(75, 192, 192, 1)",
//       borderWidth: 1,
//     },
//   ],
// }

// const userGrowthData = {
//   labels: ["January", "February", "March", "April", "May", "June"],
//   datasets: [
//     {
//       label: "User Growth",
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: "rgba(153, 102, 255, 0.2)",
//       borderColor: "rgba(153, 102, 255, 1)",
//       borderWidth: 1,
//     },
//   ],
// }

const bookingsData = {
  labels: ["Zone A", "Zone B", "Zone C", "Zone D"],
  datasets: [
    {
      label: "Bookings",
      data: [300, 50, 100, 80],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

const Analytics = () => {
  const [admin_data, setAdmin_data] = useState(null)
  const [customerData, setCustomerData] = useState(null)
  const [bookingData, setBookingData] = useState(null)
  const [revenueData, setRevenueData] = useState(null);
  const [userGrowthData, setUserGrowthData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/customer/customer-list",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        if (response.ok) {
          const result = await response.json()
          setCustomerData(result)
          console.log({ result })
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          )
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/admin_dashboard/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        if (response.ok) {
          const result = await response.json()
          setAdmin_data(result)
          console.log(result)
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          )
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
      try {
        const response = await fetch(
          "https://parkspotter-backened.onrender.com/accounts/bookings/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        if (response.ok) {
          const result = await response.json()
          setBookingData(result)
          console.log({ result })
        } else {
          console.error(
            "Failed to fetch data:",
            response.status,
            response.statusText
          )
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
      try {
        const response = await axios.get(
          "https://parkspotter-backened.onrender.com/accounts/admin_dashboard/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const data = response.data;

        const months = ["January", "February", "March", "April", "May", "June"];
        const earnings = months.map((month, index) => {

          return data.park_owners_with_subscription.reduce(
            (acc, owner) => acc + (owner.total_earnings || 0),
            0
          );
        });

        const chartData = {
          labels: months,
          datasets: [
            {
              label: "Revenue",
              data: earnings,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setRevenueData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
      try {
        const response = await axios.get(
          "https://parkspotter-backened.onrender.com/customer/customer-list",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const data = response.data;


        const userCount = data?.length;
        const months = ["January", "February", "March", "April", "May", "June"];
        const userGrowth = Array(months.length).fill(0).map((_, i) => Math.round(userCount / months.length));

        const chartData = {
          labels: months,
          datasets: [
            {
              label: "User Growth",
              data: userGrowth,
              fill: true,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        };

        setUserGrowthData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
      // try {
      //   const response = await axios.get(
      //     "https://parkspotter-backened.onrender.com/accounts/bookings/",
      //     {
      //       headers: {
      //         Authorization: `Token ${token}`, // replace YOUR_TOKEN_HERE with your actual token
      //       },
      //     }
      //   );

      //   const data = response.data;
      //   if (!Array.isArray(data)) {
      //     throw new Error("Invalid data format");
      //   }

      //   // Process the data to count the number of bookings per zone
      //   const zoneCounts = data.reduce((acc, booking) => {
      //     const zone = booking.zone;
      //     if (zone != null) {
      //       acc[zone] = (acc[zone] || 0) + 1;
      //     }
      //     return acc;
      //   }, {});

      //   // Convert the processed data into the format required by Chart.js
      //   const labels = Object.keys(zoneCounts).length > 0
      //     ? Object.keys(zoneCounts).map(zone => `Zone ${zone}`)
      //     : ["No Data"];
      //   const counts = Object.values(zoneCounts).length > 0
      //     ? Object.values(zoneCounts)
      //     : [0];

      //   const chartData = {
      //     labels: labels.length > 0 ? labels : ["No Data"],
      //     datasets: [
      //       {
      //         label: "Bookings",
      //         data: counts.length > 0 ? counts : [0],
      //         backgroundColor: [
      //           "rgba(255, 99, 132, 0.2)",
      //           "rgba(54, 162, 235, 0.2)",
      //           "rgba(255, 206, 86, 0.2)",
      //           "rgba(75, 192, 192, 0.2)",
      //           "rgba(153, 102, 255, 0.2)",
      //           "rgba(255, 159, 64, 0.2)",
      //         ],
      //         borderColor: [
      //           "rgba(255, 99, 132, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(255, 206, 86, 1)",
      //           "rgba(75, 192, 192, 1)",
      //           "rgba(153, 102, 255, 1)",
      //           "rgba(255, 159, 64, 1)",
      //         ],
      //         borderWidth: 1,
      //       },
      //     ],
      //   };


      //   setBookingData(chartData);

      // } catch (error) {
      //   console.error("Error fetching the data", error);
      //   setError(error.message);

      // } finally {
      //   setLoading(false);
      // }

    };
    fetchData()
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  // if (error) {
  //   return <p>Error: {error}</p>;
  // }
  return (
    <AnalyticsContainer>
      <Header>
        <h1>Analytics</h1>
        <DateRange>
          <span>01 Jan, 2024 to 31 Jan, 2024</span>
          <button>Filter Date</button>
        </DateRange>
      </Header>
      <Stats>
        <StatBox>
          <h2>Total Users</h2>
          <p className="increase">
            <FaUsers /> {customerData?.length}
          </p>
        </StatBox>
        <StatBox>
          <h2>Active Parkowners</h2>
          <p className="neutral">
            <FaParking /> {admin_data?.park_owners_with_subscription?.length}
          </p>
        </StatBox>
        <StatBox>
          <h2>Total Revenue</h2>
          <p className="increase">
            <FaDollarSign /> {admin_data?.net_revenue}
          </p>
        </StatBox>
        <StatBox>
          <h2>Bookings</h2>
          <p className="decrease">
            <FaChartLine /> {bookingData?.length}
          </p>
        </StatBox>
      </Stats>
      <Charts>
        <ChartBox>
          <h3>Revenue Over Time</h3>
          <Line data={revenueData} />
        </ChartBox>
        <ChartBox>
          <h3>User Growth</h3>
          {userGrowthData ? <Bar data={userGrowthData} /> : <p>No data available</p>}
        </ChartBox>
      </Charts>
      <ChartBox style={{ marginTop: "20px" }}>
        <h3>Bookings by Zone</h3>
        <Doughnut data={bookingsData} />
        {/* {bookingData ? <Doughnut data={bookingData} /> : <p>No data available</p>} */}
      </ChartBox>
    </AnalyticsContainer>
  )
}

export default Analytics
