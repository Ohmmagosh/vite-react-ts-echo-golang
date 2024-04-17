import { getAdminData } from "@/actions/get-admin-data";
import { columns } from "@/components/customer-table/columns";
import { CustomerDataTable } from "@/components/customer-table/customer-data-table";
import { useUserStore } from "@/store/user-store";
import { useEffect, useState } from "react";

export function Admin() {
  const [user] = useUserStore((state) => [state.user]);
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      const adminData = await getAdminData(user.name, user.role);
      const data = await adminData.json();
      setCustomer(data);
    };
    getData();
  }, [user]);
  return (
    <>
      <div className="w-full p-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Admin Dashboard
        </h2>
        {customer && <CustomerDataTable columns={columns} data={customer} />}
      </div>
    </>
  );
}
