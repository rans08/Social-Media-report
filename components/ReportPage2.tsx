import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip as RechartsTooltip, Legend 
} from 'recharts';
import { Lightbulb, MapPin, Users, Navigation } from 'lucide-react';
import { ReportData } from '../types';

interface Props {
  data: ReportData;
}

const COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899'];

export const ReportPage2: React.FC<Props> = ({ data }) => {
  
  // Transform traffic data for charts
  const trafficData = [
    { name: 'Website', value: data.traffic.websiteVisits },
    { name: 'Bio Link', value: data.traffic.bioClicks },
    { name: 'Story Link', value: data.traffic.storyClicks },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white aspect-[1/1.414] shadow-lg p-12 text-slate-800 flex flex-col relative print:shadow-none print:aspect-auto page-break">
       {/* Header */}
       <header className="mb-8 border-b border-slate-200 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-brand-900 tracking-tight">Deep Dive & Insights</h1>
          <p className="text-slate-500 mt-1">Strategic Breakdown</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Page 2
          </div>
        </div>
      </header>

      {/* 6. Engagement Breakdown */}
      <section className="mb-10">
        <h2 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider">6. Engagement Breakdown</h2>
        <div className="grid grid-cols-4 gap-4">
             <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-center">
                 <p className="text-xs text-slate-500 uppercase">Total Interactions</p>
                 <p className="text-2xl font-bold text-brand-600 mt-1">{data.engagementStats.totalInteractions.toLocaleString()}</p>
             </div>
             <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-center">
                 <p className="text-xs text-slate-500 uppercase">Avg Engagement Rate</p>
                 <p className="text-2xl font-bold text-purple-600 mt-1">{data.engagementStats.engagementRate}%</p>
             </div>
             <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-center">
                 <p className="text-xs text-slate-500 uppercase">Total Video Views</p>
                 <p className="text-2xl font-bold text-blue-600 mt-1">{data.engagementStats.videoViews.toLocaleString()}</p>
             </div>
             <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-center">
                 <p className="text-xs text-slate-500 uppercase">Story Completion</p>
                 <p className="text-2xl font-bold text-pink-600 mt-1">{data.engagementStats.storyCompletion}%</p>
             </div>
        </div>
      </section>

      {/* 7. Audience & Traffic (Grid Layout) */}
      <section className="grid grid-cols-2 gap-8 mb-10">
          
          {/* Audience Insights */}
          <div className="border border-slate-200 rounded-xl p-5">
             <div className="flex items-center gap-2 mb-4">
                 <Users size={18} className="text-brand-500" />
                 <h3 className="font-bold text-lg">Audience Insights</h3>
             </div>
             <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500 flex items-center gap-2"><MapPin size={14}/> Top Cities</span>
                    <span className="font-medium text-right">{data.audience.topCities}</span>
                </div>
                 <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Age Groups</span>
                    <span className="font-medium">{data.audience.topAges}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Gender Split</span>
                    <span className="font-medium">{data.audience.genderSplit}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-500">New Followers</span>
                    <span className="font-bold text-emerald-600">+{data.audience.newFollowers}</span>
                </div>
             </div>
          </div>

          {/* Traffic & CTA */}
          <div className="border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
                 <Navigation size={18} className="text-brand-500" />
                 <h3 className="font-bold text-lg">Traffic & CTA</h3>
            </div>
            <div className="flex gap-4 h-32 items-center">
                 <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={trafficData} 
                                innerRadius={30} 
                                outerRadius={50} 
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
                 <div className="w-1/2 text-sm space-y-2">
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
            <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-400 uppercase mb-2">Top CTA Posts</p>
                <div className="flex gap-2 flex-wrap">
                    {data.traffic.topCtaPosts.map((post, i) => (
                        <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 truncate max-w-full">
                            {post}
                        </span>
                    ))}
                </div>
            </div>
          </div>
      </section>

      {/* 8. Monthly Learnings */}
      <section className="flex-grow bg-slate-50 rounded-xl p-8 border border-slate-200">
         <div className="flex items-center gap-2 mb-6">
            <div className="bg-brand-600 p-2 rounded-lg text-white">
                 <Lightbulb size={24} />
            </div>
            <div>
                 <h2 className="text-xl font-bold text-slate-800">Monthly Learnings</h2>
                 <p className="text-sm text-slate-500">Key takeaways and strategic opportunities</p>
            </div>
         </div>
         
         <div className="space-y-4">
             {data.learnings.map((learning, index) => (
                 <div key={index} className="flex gap-4">
                     <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-brand-600 text-sm shadow-sm">
                         {index + 1}
                     </span>
                     <p className="text-slate-700 leading-relaxed pt-1">
                         {learning}
                     </p>
                 </div>
             ))}
         </div>
      </section>

      <footer className="mt-8 text-center text-xs text-slate-400 border-t border-slate-100 pt-4">
          Generated via SocialInsights Pro • {data.month} {data.year}
      </footer>
    </div>
  );
};