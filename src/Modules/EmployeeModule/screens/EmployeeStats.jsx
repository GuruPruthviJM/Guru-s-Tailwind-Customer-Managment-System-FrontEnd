import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChartData } from "../../../Redux/admin_model/DomainCountTicket/chartActions";
import MyBarChart from "../../../components/barGraph";
import OutageMap from "../../../components/OutageMap";
import { fetchTicketsCount } from "../../../Redux/admin_model/outage/outageActions";
import { fetchTimeData } from "../../../Redux/employee_module/stats/statsActions";

const EmployeeStats = () => {
  const dispatch = useDispatch();

  // Redux State Selectors
  const { chartData, loading: chartLoading, error: chartError } = useSelector((state) => state.chart);
  const { ticketsCount, loading: ticketsLoading, error: ticketsError } = useSelector((state) => state.outage);
  const { timeData } = useSelector((state) => state.time);

  // ✅ Prevent redundant API calls if data already exists
  useEffect(() => {
    if (!ticketsCount || Object.keys(ticketsCount).length === 0) {
      dispatch(fetchTicketsCount());
    }
  }, [dispatch, ticketsCount]);

  useEffect(() => {
    if (!chartData || Object.keys(chartData).length === 0) {
      dispatch(fetchChartData());
    }
  }, [dispatch, chartData]);

  useEffect(() => {
    if (!timeData || Object.keys(timeData).length === 0) {
      dispatch(fetchTimeData());
    }
  }, [dispatch, timeData]);

  // ✅ Memoize time data processing (Prevent unnecessary calculations)
  const time = useMemo(() => {
    if (!timeData || typeof timeData !== "object") return [];
    return Object.entries(timeData).map(([department, ticketCount]) => ({
      name: department,
      value: ticketCount,
    }));
  }, [timeData]); 

  // ✅ Memoized transformation of chartData
  const transformedChartData = useMemo(() => {
    if (!chartData || typeof chartData !== "object" || Object.keys(chartData).length === 0) 
      return [];

    return Object.entries(chartData).map(([department, ticketCount]) => ({
      name: department,
      noOfTickets: ticketCount,
    }));
  }, [chartData]);

  // ✅ Memoized transformation of ticketsCount for OutageMap
  const transformedTicketsData = useMemo(() => {
    if (!ticketsCount || typeof ticketsCount !== "object" || Object.keys(ticketsCount).length === 0) 
      return [];

    return Object.entries(ticketsCount).map(([key, value]) => {
      const [lat, lng] = key.split("_");
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        ticketsCount: value,
      };
    });
  }, [ticketsCount]);

  return (
    <div>
      {/* Section: Tickets Raised Per Domain */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 mx-32 my-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Tickets Raised As Per the Domain
          </h2>
          {chartLoading && <p className="text-center">Loading chart data...</p>}
          {chartError && <p className="text-center text-red-600">{chartError}</p>}
          {!chartLoading && !chartError && transformedChartData.length > 0 ? (
            <MyBarChart data={transformedChartData} attribute={"noOfTickets"} color={"#8884d8"} />
          ) : (
            <p className="text-center">No data available</p>
          )}
        </div>

        {/* Section: Avg Response & Resolution Time */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Avg Response and Avg Resolution Time
          </h2>
          {chartLoading && <p className="text-center">Loading chart data...</p>}
          {chartError && <p className="text-center text-red-600">{chartError}</p>}
          {!chartLoading && !chartError && time.length > 0 ? (
            <MyBarChart data={time} color={"purple"} attribute={"value"} />
          ) : (
            <p className="text-center">No data available</p>
          )}
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Section: Tickets Raised (Outage Map) */}
      <div>
        <h1 className="text-3xl font-extrabold mb-10 bg-clip-text my-8 mx-32">
          Number of Tickets Raised
        </h1>
        {ticketsLoading && <p className="text-center">Loading tickets...</p>}
        {ticketsError && <p className="text-center text-red-600">{ticketsError}</p>}
        {!ticketsLoading && !ticketsError && transformedTicketsData.length > 0 ? (
          <OutageMap
            ticketsData={transformedTicketsData}
            mapCenter={[22.5937, 78.9629]}
            zoom={5}
          />
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>

      <hr className="my-8 border-gray-300" />
    </div>
  );
};

export default EmployeeStats;
