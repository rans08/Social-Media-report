import React from 'react';
import { 
  BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { ArrowUpRight, Users, Eye, MousePointerClick, Share2 } from 'lucide-react';
import { ReportData } from '../types';

interface Props {
  data: ReportData;
  isFullScreen?: boolean;
}

const StatCard = ({ label, value, increase, icon: Icon }: { label: string; value: string; increase: number; icon: any }) => (
  <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">{label}</p>
      <h3 className="text-xl font-bold text-slate-800 mt-0.5">{value}</h3>
      <div className="flex items-center mt-1 text-emerald-600 text-xs font-medium">
        <ArrowUpRight size={14} className="mr-0.5" />
        <span>{increase}%</span>
      </div>
    </div>
    <div className="p-1.5 bg-brand-50 rounded-md text-brand-600">
      <Icon size={16} />
    </div>
  </div>
);

export const ReportPage1: React.FC<Props> = ({ data, isFullScreen = false }) => {
  return (
    <div className={`
      bg-white text-slate-800 relative print:shadow-none print:mb-0 print:m-0 page-break flex flex-col
      ${isFullScreen 
        ? 'w-full aspect-[210/297]' 
        : 'w-[210mm] h-[297mm] mx-auto shadow-lg mb-8 aspect-[210/297]'
      }
      p-8
    `}>
      
      {/* Header */}
      <header className="border-b border-slate-200 pb-4 flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-900 tracking-tight">Monthly Performance Overview</h1>
          <p className="text-slate-500 text-sm mt-0.5">Social Media Report — {data.month} {data.year}</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-full uppercase tracking-wider">
            Page 1
          </div>
        </div>
      </header>

      {/* 1. Platform Summary */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">1. Platform Summary</h2>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2 px-3">Platform</th>
                <th className="py-2 px-3 text-right">Followers</th>
                <th className="py-2 px-3 text-right">Growth %</th>
                <th className="py-2 px-3 text-right">Impressions</th>
                <th className="py-2 px-3 text-right">Reach</th>
                <th className="py-2 px-3 text-right">Interactions</th>
                <th className="py-2 px-3 text-right">Visits</th>
                <th className="py-2 px-3 text-right">Posts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.platforms.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-1.5 px-3 font-medium text-slate-800">{p.platform}</td>
                  <td className="py-1.5 px-3 text-right">{p.followers.toLocaleString()}</td>
                  <td className={`py-1.5 px-3 text-right ${p.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {p.growth > 0 ? '+' : ''}{p.growth}%
                  </td>
                  <td className="py-1.5 px-3 text-right">{p.impressions.toLocaleString()}</td>
                  <td className="py-1.5 px-3 text-right">{p.reach.toLocaleString()}</td>
                  <td className="py-1.5 px-3 text-right">{p.interactions.toLocaleString()}</td>
                  <td className="py-1.5 px-3 text-right">{p.visits.toLocaleString()}</td>
                  <td className="py-1.5 px-3 text-right">{p.posts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Highlights */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">2. Overall Highlights</h2>
        <div className="grid grid-cols-4 gap-3 mb-3">
          <StatCard label="Engagement" value="Total" increase={data.highlights.engagementInc} icon={Share2} />
          <StatCard label="Reach" value="Total" increase={data.highlights.reachInc} icon={Users} />
          <StatCard label="Visits" value="Profile" increase={data.highlights.visitsInc} icon={MousePointerClick} />
          <StatCard label="Views" value="Video" increase={data.highlights.viewsInc} icon={Eye} />
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-50 p-2.5 rounded border border-slate-100 flex justify-between items-center">
            <span className="text-slate-500">Top Content Theme:</span>
            <span className="font-semibold text-slate-800 text-right">{data.highlights.topTheme}</span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded border border-slate-100 flex justify-between items-center">
            <span className="text-slate-500">Growth Driver:</span>
            <span className="font-semibold text-slate-800 text-right">{data.highlights.growthDriver}</span>
          </div>
        </div>
      </section>

      {/* 3. Top 5 Posts */}
      <section className="mb-6 flex-grow flex flex-col">
        <h2 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">3. Top 5 Performing Posts</h2>
        <div className="rounded-lg border border-slate-200 overflow-hidden mb-2">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2 px-3 text-left w-8">#</th>
                <th className="py-2 px-3 text-left">Post Name</th>
                <th className="py-2 px-3 text-left">Format</th>
                <th className="py-2 px-3 text-right">Reach</th>
                <th className="py-2 px-3 text-right">Engage.</th>
                <th className="py-2 px-3 text-right">Saves</th>
                <th className="py-2 px-3 text-right">Clicks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.topPosts.map((post) => (
                <tr key={post.rank}>
                  <td className="py-2 px-3 font-bold text-brand-600">{post.rank}</td>
                  <td className="py-2 px-3 font-medium text-slate-800 truncate max-w-[180px]">{post.name}</td>
                  <td className="py-2 px-3">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                      post.format === 'Reel' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      post.format === 'Carousel' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {post.format}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right">{post.reach.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right">{post.engagement.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right">{post.saves.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right">{post.clicks.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-brand-50 border border-brand-100 p-2.5 rounded-md mt-auto">
          <p className="text-xs text-brand-900 leading-snug">
            <span className="font-bold mr-1">💡 Insight:</span>
            {data.topPostsInsight}
          </p>
        </div>
      </section>
        
      {/* 4. Bottom Posts & Output Summary */}
      <section className="grid grid-cols-2 gap-6 h-auto">
         {/* Bottom Posts */}
        <div className="flex flex-col h-full">
           <h2 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">4. Bottom 3 Performers</h2>
           <div className="border border-slate-200 rounded-lg overflow-hidden flex-grow">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-1.5 px-2 text-left">Name</th>
                  <th className="py-1.5 px-2 text-left">Format</th>
                  <th className="py-1.5 px-2 text-left">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.bottomPosts.map((p, i) => (
                  <tr key={i}>
                    <td className="py-1.5 px-2 font-medium truncate max-w-[80px]">{p.name}</td>
                    <td className="py-1.5 px-2 text-slate-500">{p.format}</td>
                    <td className="py-1.5 px-2 text-red-500 truncate max-w-[100px]">{p.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
           </div>
        </div>

        {/* Output Summary */}
        <div className="flex flex-col h-full">
            <h2 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">5. Content Output</h2>
            <div className="flex flex-1 gap-2 items-center border border-slate-200 rounded-lg p-3">
                <div className="flex-1 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            { name: 'Reel', val: data.contentOutput.reels },
                            { name: 'Static', val: data.contentOutput.statics },
                            { name: 'Car.', val: data.contentOutput.carousels },
                            { name: 'Story', val: data.contentOutput.stories },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" fontSize={9} axisLine={false} tickLine={false} interval={0} />
                            <Tooltip cursor={{fill: '#f1f5f9'}} />
                            <Bar dataKey="val" radius={[3, 3, 0, 0]}>
                                <Cell fill="#8b5cf6" />
                                <Cell fill="#3b82f6" />
                                <Cell fill="#0ea5e9" />
                                <Cell fill="#cbd5e1" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-24 flex flex-col justify-center space-y-1.5 text-xs">
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                        <span className="text-slate-500">Total</span>
                        <span className="font-bold">{data.contentOutput.total}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                         <span className="text-slate-500">Status</span>
                         <span className="font-bold text-emerald-600">{data.contentOutput.consistency}</span>
                    </div>
                     <div className="text-[10px] text-slate-400 pt-0.5 leading-tight">
                         Best Time: <br/>{data.contentOutput.bestTime}
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};