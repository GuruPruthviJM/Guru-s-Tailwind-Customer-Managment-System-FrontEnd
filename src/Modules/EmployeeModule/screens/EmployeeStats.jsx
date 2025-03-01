import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChartData } from "../../../Redux/admin_model/DomainCountTicket/chartActions";
import MyBarChart from "../../../components/barGraph";
import OutageMap from "../../../components/OutageMap";
import { fetchTicketsCount } from "../../../Redux/admin_model/outage/outageActions";

const EmployeeStats = () => {
    const dispatch = useDispatch();
    const { chartData, loading: chartLoading, error: chartError } = useSelector(
        (state) => state.chart
      );
    const { ticketsCount, loading: ticketsLoading, error: ticketsError } = useSelector(
        (state) => state.outage
      );

    const time = [
      {name: "avgResolution", value: 157},
      {name: "avgResponce", value: 188.25}
    ]

    useEffect(() => {
        dispatch(fetchTicketsCount());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchChartData());
    }, [dispatch]);

    const transformedChartData = useMemo(() => {
        if (!chartData || typeof chartData !== "object") return [];

        return Object.entries(chartData).map(([department, ticketCount]) => ({
            name: department,
            noOfTickets: ticketCount
        }));
    }, [chartData]);

    const transformedTicketsData = useMemo(() => {
        if (!ticketsCount || typeof ticketsCount !== "object") return [];
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
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 mx-32 my-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Tickets Raised As Per the Domain
          </h2>
          {chartLoading && <p className="text-center">Loading chart data...</p>}
          {chartError && <p className="text-center text-red-600">{chartError}</p>}
          {!chartLoading && !chartError && chartData && (
            <MyBarChart data={transformedChartData} attribute={"noOfTickets"} color={"#8884d8"} />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Avg Responce and Avg Resoulution Time
          </h2>
          {chartLoading && <p className="text-center">Loading chart data...</p>}
          {chartError && <p className="text-center text-red-600">{chartError}</p>}
          {!chartLoading && !chartError && chartData && (
            <MyBarChart data={time} color={"purple"} attribute={"value"} />
          )}
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      <div>
        <h1 className="text-3xl font-extrabold mb-10 bg-clip-text my-8 mx-32">
          Number of tickets raised
        </h1>
        {ticketsLoading && <p className="text-center">Loading tickets...</p>}
        {ticketsError && <p className="text-center text-red-600">{ticketsError}</p>}
        {!ticketsLoading && !ticketsError && (
          <OutageMap
            ticketsData={transformedTicketsData}
            mapCenter={[22.5937, 78.9629]}
            zoom={5}
          />
        )}
      </div>

      <hr className="my-8 border-gray-300" />
    </div>
    );
};

export default EmployeeStats;
