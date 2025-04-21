'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  IconEye,
  IconUsers,
  IconDevices,
  IconWorld,
  IconRefresh,
  IconLink,
  IconBrowser,
  IconChevronRight,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconDeviceTablet,
  IconUnknown,
} from '@tabler/icons-react';
import { VisitorStats, Visitor } from '@/types/analytics';

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VisitorStats | null>(null);
  const [generatingMock, setGeneratingMock] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics');
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = async () => {
    try {
      setGeneratingMock(true);
      const response = await fetch('/api/analytics?mock=true&count=100');
      
      if (!response.ok) {
        throw new Error('Failed to generate mock data');
      }
      
      await fetchData();
    } catch (err) {
      console.error('Error generating mock data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setGeneratingMock(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <IconDeviceMobile size={18} />;
      case 'desktop':
        return <IconDeviceDesktop size={18} />;
      case 'tablet':
        return <IconDeviceTablet size={18} />;
      default:
        return <IconUnknown size={18} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatPath = (path: string) => {
    return path === '/' ? 'Homepage' : path;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2"
            onClick={fetchData}
            disabled={loading}
          >
            <IconRefresh size={18} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-700 text-white rounded-md flex items-center space-x-2"
            onClick={generateMockData}
            disabled={generatingMock}
          >
            <IconRefresh size={18} className={generatingMock ? 'animate-spin' : ''} />
            <span>Generate Mock Data</span>
          </motion.button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : data ? (
        <>
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Total Visits</p>
                  <h2 className="text-3xl font-bold mt-1">{data.total_visits.toLocaleString()}</h2>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
                  <IconEye size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Unique Visitors</p>
                  <h2 className="text-3xl font-bold mt-1">{data.unique_visitors.toLocaleString()}</h2>
                </div>
                <div className="bg-green-100 p-3 rounded-lg text-green-700">
                  <IconUsers size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Page Views</p>
                  <h2 className="text-3xl font-bold mt-1">{data.page_views.toLocaleString()}</h2>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg text-purple-700">
                  <IconLink size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Device Types</p>
                  <h2 className="text-3xl font-bold mt-1">
                    {Object.keys(data.device_breakdown).length}
                  </h2>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg text-orange-700">
                  <IconDevices size={24} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Device Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <IconDevices className="mr-2" /> Device Breakdown
              </h2>
              <div className="space-y-4">
                {Object.entries(data.device_breakdown).map(([device, count]) => {
                  const percentage = count / data.total_visits * 100;
                  return (
                    <div key={device} className="relative">
                      <div className="flex justify-between mb-1">
                        <span className="flex items-center text-sm font-medium text-gray-700">
                          {getDeviceIcon(device)}
                          <span className="ml-2 capitalize">{device}</span>
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {count} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Top Pages */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <IconLink className="mr-2" /> Top Pages
              </h2>
              <div className="space-y-4">
                {data.top_pages.map((page) => {
                  const percentage = page.views / data.total_visits * 100;
                  return (
                    <div key={page.path} className="relative">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 truncate max-w-[70%]">
                          {formatPath(page.path)}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {page.views} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            
            {/* Visitors by Country */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <IconWorld className="mr-2" /> Visitors by Country
              </h2>
              <div className="space-y-4">
                {data.locations.slice(0, 5).map((location) => {
                  const percentage = location.count / data.total_visits * 100;
                  return (
                    <div key={location.country} className="relative">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {location.country}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {location.count} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Visitors */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <IconUsers className="mr-2" /> Recent Visitors
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                      <th className="pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                      <th className="pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recent_visitors.map((visitor: Visitor) => (
                      <tr key={visitor.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 text-sm text-gray-700">
                          {formatDate(visitor.timestamp)}
                        </td>
                        <td className="py-2 text-sm text-gray-700 truncate max-w-[150px]">
                          {formatPath(visitor.url_path)}
                        </td>
                        <td className="py-2 text-sm text-gray-700 flex items-center">
                          {getDeviceIcon(visitor.device_type)}
                          <span className="ml-1 capitalize">{visitor.device_type}</span>
                        </td>
                        <td className="py-2 text-sm text-gray-700">
                          {visitor.country || 'Unknown'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          <p>No analytics data available. Try generating mock data.</p>
        </div>
      )}
    </div>
  );
} 