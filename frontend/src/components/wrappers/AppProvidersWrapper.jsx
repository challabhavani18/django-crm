import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/useAuthContext';
import { LayoutProvider } from '@/context/useLayoutContext';
import { NotificationProvider } from '@/context/useNotificationContext';

// ✅ ADD REDUX
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const AppProvidersWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <LayoutProvider>
          <NotificationProvider>
            {children}
            <ToastContainer theme="colored" />
          </NotificationProvider>
        </LayoutProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AppProvidersWrapper;