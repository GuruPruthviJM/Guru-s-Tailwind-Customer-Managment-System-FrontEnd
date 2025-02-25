import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const getColorForTickets = (ticketsCount, minTickets, maxTickets) => {
  if (maxTickets === minTickets) {
    return "rgb(0, 255, 0)";
  }
  const ratio = (ticketsCount - minTickets) / (maxTickets - minTickets);
  const r = Math.floor(ratio * 255);
  const g = Math.floor(255 - ratio * 255);
  return `rgb(${r}, ${g}, 0)`;
};

// Function to create a custom icon for each individual marker
const createCustomIcon = (ticketsCount, minTickets, maxTickets) => {
  const color = getColorForTickets(ticketsCount, minTickets, maxTickets);
  return L.divIcon({
    html: `<div class="flex items-center justify-center text-white font-bold rounded-full w-[30px] h-[30px] border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] text-[14px]" style="background-color: ${color};">${ticketsCount}</div>`,
    className: "",
    iconSize: [30, 30],
  });
};

const createClusterIcon = (cluster, minTickets, maxTickets) => {
  const markers = cluster.getAllChildMarkers();
  const totalTickets = markers.reduce((acc, marker) => {
    return acc + (marker.options.ticketCount || 0);
  }, 0);
  const color = getColorForTickets(totalTickets, minTickets, maxTickets);
  return L.divIcon({
    html: `<div class="flex items-center justify-center text-white font-bold rounded-full w-[40px] h-[40px] border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] text-[16px]" style="background-color: ${color};">${totalTickets}</div>`,
    className: "",
    iconSize: [40, 40],
  });
};

const OutageMap = ({
  ticketsData,
  mapCenter = [22.5937, 78.9629],
  zoom = 5,
}) => {
  useEffect(() => {
    console.log("OutageMap component rendered");
    console.log("Tickets Data:", ticketsData);
  }, [ticketsData]);

  // Compute the min and max ticket counts from the data for color scaling
  const ticketCounts = ticketsData.map((ticket) => ticket.ticketsCount);
  const minTickets = Math.min(...ticketCounts);
  const maxTickets = Math.max(...ticketCounts);

  return (
    <div className="my-6 mx-32">
      {/* Responsive container for the map */}
      <div className="relative w-full h-96">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ width: "100%", height: "100%" }}
          className="rounded-[10px] overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup
            iconCreateFunction={(cluster) =>
              createClusterIcon(cluster, minTickets, maxTickets)
            }
          >
            {ticketsData.map((ticket, index) => (
              <Marker
                key={index}
                position={[ticket.lat, ticket.lng]}
                icon={createCustomIcon(ticket.ticketsCount, minTickets, maxTickets)}
                ticketCount={ticket.ticketsCount}
              >
                <Popup>
                  {ticket.popupText || `Tickets: ${ticket.ticketsCount}`}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default OutageMap;
