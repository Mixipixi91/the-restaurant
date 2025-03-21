import { RouterProvider } from "react-router";
import { router } from "./Router";
import { CustomerProvider } from './context/CustomerProvider';
import { BookingProvider } from './context/BookingProvider';

function App() {
  return (
    <CustomerProvider>
      <BookingProvider>
        <RouterProvider router={router} />
      </BookingProvider>
    </CustomerProvider>
  );
}

export default App;