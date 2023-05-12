import {
  HomePage,
  CustomersPage,
  InventoryPage,
  AccountsPage,
  SalesPage,
  StorePage
} from "./pages";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    exact: true,
    sidebar: () => <HomePage />,
    main: () => <h2>Home</h2>,
  },
  {
    path: "/dashboard/customers",
    exact: true,
    sidebar: () => <CustomersPage />,
    main: () => <h2>Customers</h2>,
  },
  {
    path: "/dashboard/Medicines",
    exact: true,
    sidebar: () => <InventoryPage />,
    main: () => <h2>Medicines</h2>,
  },
  {
    path: "/dashboard/accounts",
    exact: true,
    sidebar: () => <AccountsPage />,
    main: () => <h2>Accounts</h2>,
  },
  {
    path: "/dashboard/Sales",
    exact: true,
    sidebar: () => <SalesPage />,
    main: () => <h2>Sales</h2>,
  },
  {
    path: "/dashboard/stores",
    exact: true,
    sidebar: () => <StorePage />,
    main: () => <h2>Stores</h2>,
  }
];
