const NotificationCard = ({ title, message }) => (
    <div className="w-[70%]">
      <div className="bg-white border border-gray-300 rounded-lg mb-4 transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <div className="p-4">
          <h5 className="text-lg font-bold">{title}</h5>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
  
  export default NotificationCard;
  