import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "*",
                element: <PageNotFound />
            }
        ]
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
        </QueryClientProvider>
    );
}

export default App;
