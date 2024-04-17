import { ColumnDef } from "@tanstack/react-table";
import { TCustomer } from "@/types/customer";

export const columns: ColumnDef<TCustomer>[] = [
    {
      accessorKey: "Index",
      header: () => <div className="text-center">Index</div>,
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue("Index")}</div>
      },
    },
    {
      accessorKey: "CustomerId",
      header: () => <div className="text-center">Customer Id</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("CustomerId")}</div>
      },
    },
    {
      accessorKey: "FirstName",
      header: () => <div className="text-right">FirstName</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("FirstName")}</div>
      },
    },
    {
      accessorKey: "LastName",
      header: () => <div className="text-right">LastName</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("LastName")}</div>
      },
    },
    {
      accessorKey: "Company",
      header: () => <div className="text-right">Company</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("Company")}</div>
      },
    },
    {
      accessorKey: "City",
      header: () => <div className="text-right">City</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("City")}</div>
      },
    },
    {
      accessorKey: "Country",
      header: () => <div className="text-right">Country</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("Country")}</div>
      },
    },
    {
      accessorKey: "Phone1",
      header: () => <div className="text-right">Phone1</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("Phone1")}</div>
      },
    },
    {
      accessorKey: "Phone2",
      header: () => <div className="text-right">Phone2</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("Phone2")}</div>
      },
    },
    {
      accessorKey: "Email",
      header: () => <div className="text-right">Email</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("Email")}</div>
      },
    },
    {
      accessorKey: "SubscriptionDate",
      header: () => <div className="text-right">Subscription Date</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("SubscriptionDate")}</div>
      },
    },
    {
      accessorKey: "Website",
      header: () => <div className="text-right">Website</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("Website")}</div>
      },
    }
  ]
