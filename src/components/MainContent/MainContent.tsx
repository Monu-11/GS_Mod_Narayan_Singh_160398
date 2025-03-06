import { DASHBOARD_PAGES } from '@/core/constants';
import Store from '../Store';
import Planning from '../Planning';
import Chart from '../Chart';
import SKU from '../SKU';

interface MainContentProps {
  activeItem: string;
}

const MainContent = ({ activeItem }: MainContentProps) => {
  return (
    <div className='flex-1 p-6'>
      <div className='space-y-4 p-2'>
        {activeItem === DASHBOARD_PAGES.STORE && (
          <div className='rounded-lg bg-white p-4 shadow-md'>
            <Store />
          </div>
        )}
        {activeItem === DASHBOARD_PAGES.SKU && (
          <div className='rounded-lg bg-white p-4 shadow-md'>
            <SKU />
          </div>
        )}
        {activeItem === DASHBOARD_PAGES.PLANNING && (
          <div className='rounded-lg bg-white p-4 shadow-md'>
            <Planning />
          </div>
        )}
        {activeItem === DASHBOARD_PAGES.CHART && (
          <div className='rounded-lg bg-white p-4 shadow-md'>
            <Chart />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
