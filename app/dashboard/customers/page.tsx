import { Metadata } from 'next';
import Table from '@/app/ui/customers/table';
import { fetchCustomers } from '@/app/lib/data';


export const metadata: Metadata = {
  title: 'Customers',
};

export default function Page() {
  return (
    <div>
      <Table customers={[]} />
    </div>
  );
}








