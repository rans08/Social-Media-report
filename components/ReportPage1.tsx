import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Eye, MousePointerClick, Share2, Layers } from 'lucide-react';
import { ReportData, PlatformMetric, TopPost, BottomPost } from '../types';

interface Props {
  data: ReportData;
  isFullScreen?: boolean;
}

const StatCard = ({ label, value, increase, icon: Icon }: { label: string; value: string; increase: number; icon: any }) => (
  <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      <div className="flex items-center mt-2 text-emerald-600 text-sm font-medium">
        <ArrowUpRight size={16} className="mr-1" />
        <span>{increase}%</span>
      </div>
    </div>
    <div className="p-2 bg-brand-50 rounded-md text-brand-600">
      <Icon size={20} />
    </div>
  </div>
);

export const ReportPage1: React.FC<Props> = ({ data, isFullScreen = false }) => {
  return (
    <div className={`
      w-full bg-white p-8 sm:p-12 text-slate-800 flex flex-col relative print:shadow-none print:mb-0 print:p-8 page-break
      ${isFullScreen 
        ? 'aspect-[1/1.414]' 
        : 'max-w-[210mm] mx-auto aspect-[1/1.414] shadow-lg mb-8'
      }
    `}>
      
      {/* Header */}
      <header className="mb-8 border-b border-slate-200 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-900 tracking-tight">Monthly Performance Overview</h1>
          <p className="text-slate-500 mt-1">Social Media Report — {data.month} {data.year}</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Page 1
          </div>
        </div>
      </header>

      {/* 1. Platform Summary */}
      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase text-slate-400 mb-3 tracking-wider">1. Platform Summary</h2>
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4 text-right">Followers</th>
                <th className="py-3 px-4 text-right">Growth %</th>
                <th className="py-3 px-4 text-right">Impressions</th>
                <th className="py-3 px-4 text-right">Reach</th>
                <th className="py-3 px-4 text-right">Interactions</th>
                <th className="py-3 px-4 text-right">Visits</th>
                <th className="py-3 px-4 text-right">Posts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.platforms.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2 px-4 font-medium text-slate-800">{p.platform}</td>
                  <td className="py-2 px-4 text-right">{p.followers.toLocaleString()}</td>
                  <td className={`py-2 px-4 text-right ${p.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {p.growth > 0 ? '+' : ''}{p.growth}%
                  </td>
                  <td className="py-2 px-4 text-right">{p.impressions.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right">{p.reach.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right">{p.interactions.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right">{p.visits.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right">{p.posts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Highlights */}
      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase text-slate-400 mb-3 tracking-wider">2. Overall Highlights</h2>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <StatCard label="Total Engagement" value="Overall" increase={data.highlights.engagementInc} icon={Share2} />
          <StatCard label="Total Reach" value="People" increase={data.highlights.reachInc} icon={Users} />
          <StatCard label="Profile Visits" value="Traffic" increase={data.highlights.visitsInc} icon={MousePointerClick} />
          <StatCard label="Video Views" value="Visibility" increase={data.highlights.viewsInc} icon={Eye} />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-50 p-3 rounded border border-slate-100 flex justify-between">
            <span className="text-slate-500">Top Content Theme:</span>
            <span className="font-semibold text-slate-800">{data.highlights.topTheme}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded border border-slate-100 flex justify-between">
            <span className="text-slate-500">Audience Growth Driver:</span>
            <span className="font-semibold text-slate-800">{data.highlights.growthDriver}</span>
          </div>
        </div>
      </section>

      {/* 3. Top 5 Posts */}
      <section className="mb-8 flex-grow">
        <h2 className="text-sm font-bold uppercase text-slate-400 mb-3 tracking-wider">3. Top 5 Performing Posts</h2>
        <div className="rounded-lg border border-slate-200 overflow-hidden mb-3">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2 px-4 text-left w-12">#</th>
                <th className="py-2 px-4 text-left">Post Name</th>
                <th className="py-2 px-4 text-left">Format</th>
                <th className="py-2 px-4 text-right">Reach</th>
                <th className="py-2 px-4 text-right">Engage.</th>
                <th className="py-2 px-4 text-right">Saves</th>
                <th className="py-2 px-4 text-right">Clicks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.topPosts.map((post) => (
                <tr key={post.rank}>
                  <td className="py-2 px-4 font-bold text-brand-600">{post.rank}</td>
                  <td className="py-2 px-4 font-medium text-slate-800 truncate max-w-[200px]">{post.name}</td>
                  <td className="py-2 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      post.format === 'Reel' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      post.format === 'Carousel' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {post.format}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right">{post.reach.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right">{post.engagement.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right">{post.saves.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right">{post.clicks.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-brand-50 border border-brand-100 p-3 rounded-md">
          <p className="text-sm text-brand-900">
            <span className="font-bold mr-2">💡 Insight:</span>
            {data.topPostsInsight}
          </p>
        </div>
      </section>
        
      {/* 4. Bottom Posts & Output Summary */}
      <section className="grid grid-cols-2 gap-8 h-48">
         {/* Bottom Posts */}
        <div>
           <h2 className="text-sm font-bold uppercase text-slate-400 mb-3 tracking-wider">4. Bottom 3 Performers</h2>
           <table className="w-full text-xs border border-slate-200 rounded-lg overflow-hidden">
             <thead className="bg-slate-50 font-semibold border-b border-slate-200">
               <tr>
                 <th className="py-2 px-2 text-left">Name</th>
                 <th className="py-2 px-2 text-left">Format</th>
                 <th className="py-2 px-2 text-left">Reason</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {data.bottomPosts.map((p, i) => (
                 <tr key={i}>
                   <td className="py-2 px-2 font-medium truncate max-w-[100px]">{p.name}</td>
                   <td className="py-2 px-2 text-slate-500">{p.format}</td>
                   <td className="py-2 px-2 text-red-500">{p.reason}</td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>

        {/* Output Summary */}
        <div>
            <h2 className="text-sm font-bold uppercase text-slate-400 mb-3 tracking-wider">5. Content Output</h2>
            <div className="flex h-32 gap-4">
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            { name: 'Reels', val: data.contentOutput.reels },
                            { name: 'Static', val: data.contentOutput.statics },
                            { name: 'Car.', val: data.contentOutput.carousels },
                            { name: 'Story', val: data.contentOutput.stories },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: '#f1f5f9'}} />
                            <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                                <Cell fill="#8b5cf6" />
                                <Cell fill="#3b82f6" />
                                <Cell fill="#0ea5e9" />
                                <Cell fill="#cbd5e1" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-1/3 flex flex-col justify-center space-y-2 text-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                        <span className="text-slate-500">Total</span>
                        <span className="font-bold">{data.contentOutput.total}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                         <span className="text-slate-500">Status</span>
                         <span className="font-bold text-emerald-600">{data.contentOutput.consistency}</span>
                    </div>
                     <div className="text-xs text-slate-400 pt-1">
                         Best Time: <br/>{data.contentOutput.bestTime}
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};