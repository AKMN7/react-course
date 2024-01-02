import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                index: true,
                loader: () => redirect("/dashboard")
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "bookings",
                element: <Bookings />
            },
            {
                path: "bookings/:bookingId",
                element: <Booking />
            },
            {
                path: "checkin/:bookingId",
                element: <CheckIn />
            },
            {
                path: "cabins",
                element: <Cabins />
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "settings",
                element: <Settings />
            },
            {
                path: "account",
                element: <Account />
            }
        ]
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "*",
        element: <PageNotFound />
    }
]);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000
        }
    }
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobalStyles />
            <RouterProvider router={router} />
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "var(--color-grey-0)",
                        color: "var(--color-grey-700)"
                    }
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
