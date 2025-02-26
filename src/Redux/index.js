// src/redux/reducers/index.js
import ticketReducer from './customer_model/Ticket/ticketReducer';
import paymentReducer from './customer_model/Payments/paymentReducer';
import authReducer from './signUp/logIn/logInReducer';
import signUpReducer from './signUp/signIn/signInReducer';
import collegueReducer from './employee_module/collegue/collegueReducers';
import managerStatusReducer from './manager_module/managerHomeStatus/managerStatusReducers';
import customerDetailsReducer from './customer_model/CustomerProfile/customerProfileReducers';
import managerTicketReducer from './manager_module/managerTicketTable/managerTicketReducer';
import customerDetailsEditReducer from './customer_model/CustomerProfile/customerProfileEditReducers';
import employeeDetailsReducer from './employee_module/details/detailsReducers';
import employeeDetailsEditReducer from './employee_module/details/editReducers';
import managerDetailsReducer from './manager_module/details/detailsReducers';
import managerDetailsEditReducer from './manager_module/details/editReducers';
import otpReducer from './signUp/otp/otpReducers';
import outageReducer from './admin_model/outage/outageReducers';
import chartReducer from './admin_model/DomainCountTicket/chartReducers';
import ticketRaiseReducer from './customer_model/Ticket/raiseTicketReducers'
import addEmployeeReducer from './admin_model/CRUD/addEmployeeReducer';
import updateEmployeeReducer from './admin_model/CRUD/updateEmployeeReducer';
import deleteEmployeeReducer from './admin_model/CRUD/deleteEmployeeReducer';

const rootReducer = {
    tickets: ticketReducer,
    payments: paymentReducer,
    auth: authReducer,
    signUp: signUpReducer,
    otp: otpReducer,
    collegue: collegueReducer,
    managerStatus: managerStatusReducer,
    managerTicket: managerTicketReducer,
    customerDetails: customerDetailsReducer,
    customerDetailsEdit: customerDetailsEditReducer,
    employeeDetails: employeeDetailsReducer,
    employeeDetailsEdit: employeeDetailsEditReducer,
    managerDetails: managerDetailsReducer,
    managerDetailsEdit: managerDetailsEditReducer,
    outage: outageReducer,
    chart: chartReducer,  
    ticketRaise: ticketRaiseReducer, 
    registerEmployee: addEmployeeReducer,
    updateEmployee: updateEmployeeReducer,
    deleteEmployee: deleteEmployeeReducer
};

export default rootReducer;
