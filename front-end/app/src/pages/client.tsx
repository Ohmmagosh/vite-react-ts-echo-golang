import { useEffect, useState } from "react";
import { getClientData } from "@/actions/get-client-data";

import { useUserStore } from "@/store/user-store";
import { CustomerDataTable } from "@/components/customer-table/customer-data-table";
import { columns } from "@/components/customer-table/columns";

export function Client() {
  const [user] = useUserStore((state) => [state.user]);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      const clientData = await getClientData(user.name, user.role);
      const data = await clientData.json();
      setCustomer(data);
    };
    getData();
  }, [user]);
  return (
    <>
      <div className="w-full p-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Client Dashboard
        </h2>
        {customer && <CustomerDataTable columns={columns} data={customer} />}
      </div>
    </>
  );
}
