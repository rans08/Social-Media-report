import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip
} from 'recharts';
import { Lightbulb, MapPin, Users, Navigation } from 'lucide-react';
import { ReportData } from '../types';

interface Props {
  data: ReportData;
  isFullScreen?: boolean;
}

const COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899'];

export const ReportPage2: React.FC<Props> = ({ data, isFullScreen = false }) => {
  
  const trafficData = [
    { name: 'Website', value: data.traffic.websiteVisits },
    { name: 'Bio Link', value: data.traffic.bioClicks },
    { name: 'Story Link', value: data.traffic.storyClicks },
  ];

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
       <header className="border-b border-slate-200 pb-4 flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-900 tracking-tight">Deep Dive & Insights</h1>
          <p className="text-slate-500 text-sm mt-0.5">Strategic Breakdown</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-wider">
            Page 2
          </div>
        </div>
      </header>

      {/* 6. Engagement Breakdown */}
      <section className="mb-8">
        <h2 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">6. Engagement Breakdown</h2>
        <div className="grid grid-cols-4 gap-4">
             <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
                 <p className="text-[10px] text-slate-500 uppercase font-semibold">Interactions</p>
                 <p className="text-xl font-bold text-brand-600 mt-1">{data.engagementStats.totalInteractions.toLocaleString()}</p>
             </div>
             <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
                 <p className="text-[10px] text-slate-500 uppercase font-semibold">Eng. Rate</p>
                 <p className="text-xl font-bold text-purple-600 mt-1">{data.engagementStats.engagementRate}%</p>
             </div>
             <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
                 <p className="text-[10px] text-slate-500 uppercase font-semibold">Video Views</p>
                 <p className="text-xl font-bold text-blue-600 mt-1">{data.engagementStats.videoViews.toLocaleString()}</p>
             </div>
             <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-center">
                 <p className="text-[10px] text-slate-500 uppercase font-semibold">Story Comp.</p>
                 <p className="text-xl font-bold text-pink-600 mt-1">{data.engagementStats.storyCompletion}%</p>
             </div>
        </div>
      </section>

      {/* 7. Audience & Traffic (Grid Layout) */}
      <section className="grid grid-cols-2 gap-6 mb-8">
          
          {/* Audience Insights */}
          <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
             <div className="flex items-center gap-2 mb-3">
                 <Users size={16} className="text-brand-500" />
                 <h3 className="font-bold text-base">Audience Insights</h3>
             </div>
             <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500 flex items-center gap-1.5"><MapPin size={12}/> Top Cities</span>
                    <span className="font-medium text-right truncate max-w-[120px]">{data.audience.topCities}</span>
                </div>
                 <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Age Groups</span>
                    <span className="font-medium">{data.audience.topAges}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Gender Split</span>
                    <span className="font-medium">{data.audience.genderSplit}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-500">New Followers</span>
                    <span className="font-bold text-emerald-600">+{data.audience.newFollowers}</span>
                </div>
             </div>
          </div>

          {/* Traffic & CTA */}
          <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
                 <Navigation size={16} className="text-brand-500" />
                 <h3 className="font-bold text-base">Traffic & CTA</h3>
            </div>
            <div className="flex gap-2 items-center mb-2">
                 <div className="w-20 h-20 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={trafficData} 
                                innerRadius={20} 
                                outerRadius={35} 
                                paddingAngle={5} 
                                dataKey="value"
                            >
                                {trafficData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                        </PieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="flex-1 text-xs space-y-1.5">
                     <div className="flex justify-between">
                         <span className="text-slate-500">Website</span>
                         <span className="font-bold">{data.traffic.websiteVisits}</span>
                     </div>
                     <div className="flex justify-between">
                         <span className="text-slate-500">Bio Link</span>
                         <span className="font-bold">{data.traffic.bioClicks}</span>
                     </div>
                      <div className="flex justify-between">
                         <span className="text-slate-500">Story</span>
                         <span className="font-bold">{data.traffic.storyClicks}</span>
                     </div>
                 </div>
            </div>
            <div className="pt-2 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase mb-1.5">Top CTA Posts</p>
                <div className="flex gap-1.5 flex-wrap">
                    {data.traffic.topCtaPosts.map((post, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 truncate max-w-full">
                            {post}
                        </span>
                    ))}
                </div>
            </div>
          </div>
      </section>

      {/* 8. Monthly Learnings */}
      <section className="flex-grow bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col">
         <div className="flex items-center gap-3 mb-5">
            <div className="bg-brand-600 p-2 rounded-lg text-white">
                 <Lightbulb size={20} />
            </div>
            <div>
                 <h2 className="text-lg font-bold text-slate-800">Monthly Learnings</h2>
                 <p className="text-xs text-slate-500">Key takeaways and strategic opportunities</p>
            </div>
         </div>
         
         <div className="space-y-3 flex-grow">
             {data.learnings.map((learning, index) => (
                 <div key={index} className="flex gap-3">
                     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-brand-600 text-xs shadow-sm">
                         {index + 1}
                     </span>
                     <p className="text-slate-700 text-sm leading-relaxed pt-0.5">
                         {learning}
                     </p>
                 </div>
             ))}
         </div>
         
         <div className="mt-auto text-center text-[10px] text-slate-400 border-t border-slate-200 pt-3">
            Generated via SocialInsights Pro • {data.month} {data.year}
         </div>
      </section>

    </div>
  );
};