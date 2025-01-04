import { DataCharts } from '@/components/shared/data-charts';
import { DataGrid } from '@/components/shared/data-grid';

export default function OverviewPage() {
  return (
    <div className='max-w-screen-2xl mx-auto pb-10 -mt-24'>
      <DataGrid />
      <DataCharts />
    </div>
  );
}
