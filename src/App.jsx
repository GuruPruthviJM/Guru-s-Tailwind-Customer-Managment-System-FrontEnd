import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import CustomerHome from './Modules/CustomerModule/screen/CustomerHome'
import Layout from './Layout'
import { RouterProvider } from 'react-router-dom';
import LoginForm from './components/SignIn/Login';
import SignUp from './components/SignIn/SignUp';
import Reset from './components/SignIn/Reset'
import AboutUs from './Modules/CustomerModule/screen/About';
import TicketList from './Modules/CustomerModule/screen/MyTicket';
import Payment from './Modules/CustomerModule/screen/PaymentForm';
import Notifications from './Modules/CustomerModule/screen/Notification';
import PaymentList from './Modules/CustomerModule/screen/PaymentHistory';
import CustomerList from './Modules/CustomerModule/screen/CustomerDetails';
import FAQs from './Modules/CustomerModule/screen/FAQS';
import EditForm from './Modules/CustomerModule/screen/Edits';
import EmployeeHome from './Modules/EmployeeModule/screens/EmployeeHome';
import Collegue from './Modules/EmployeeModule/screens/EmployeeCollegue';
import EmployeeList from './Modules/EmployeeModule/screens/EmployeeDetails';
import EmployeeEditForm from './Modules/EmployeeModule/screens/EmployeeEdits';
import StatusTickets from './Modules/ManagerModule/screens/ManagerHome';
import ManagerTicketList from './Modules/ManagerModule/screens/ManagerTickets';
import ManagerColleagues from './Modules/ManagerModule/screens/ManagerCollegue';

export default function App() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Layout />}>
          {/* Authontication Module */}
          <Route path="/login" element={<LoginForm />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/reset' element={<Reset />} />
          {/* Customer Module */}
          <Route path="/" element={<CustomerHome />} />  
          <Route path="/customers" element={<CustomerHome />} />  
          <Route path='/about' element={<AboutUs />} />
          <Route path='/customers/tickets' element={<TicketList />} />
          <Route path='/customers/purchase' element={<Payment />} />
          <Route path='/customers/notification' element={<Notifications />} />
          <Route path='/customers/payments' element={<PaymentList />} />
          <Route path='/customers/profile' element={<CustomerList />} />
          <Route path='/customers/faqs' element={<FAQs />} />
          <Route path='/customers/edits' element={<EditForm />} />
          {/* Employee Module */}
          <Route path='/employees' element={<EmployeeHome />} />
          <Route path='/employees/colleague' element={<Collegue />} />
          <Route path='/employees/profile' element={<EmployeeList />} />
          <Route path='/employees/profile/:id' element={<EmployeeList />} />
          <Route path='/employees/edits' element={<EmployeeEditForm />} />
          {/* Manager Module */}
          <Route path='/managers' element={<StatusTickets />} />
          <Route path='/managers/tickets/:id' element={<ManagerTicketList />} />
          <Route path='/managers/colleague' element={<ManagerColleagues />} />
        </Route>
    )
  );

  return <RouterProvider router={router} />;
} 