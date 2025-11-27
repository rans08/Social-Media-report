import { ReportData } from './types';

export const INITIAL_DATA: ReportData = {
  month: "October",
  year: "2023",
  platforms: [
    { platform: "Instagram", followers: 12500, growth: 2.4, impressions: 45000, reach: 32000, interactions: 4500, visits: 1200, views: 25000, posts: 12 },
    { platform: "Facebook", followers: 8200, growth: 0.5, impressions: 12000, reach: 9000, interactions: 800, visits: 300, views: 1000, posts: 8 },
    { platform: "LinkedIn", followers: 5400, growth: 5.1, impressions: 28000, reach: 21000, interactions: 1200, visits: 850, views: 0, posts: 15 },
    { platform: "X", followers: 3100, growth: -0.2, impressions: 8000, reach: 7500, interactions: 300, visits: 100, views: 0, posts: 20 },
    { platform: "YouTube", followers: 1200, growth: 8.5, impressions: 15000, reach: 14000, interactions: 600, visits: 50, views: 14000, posts: 4 },
  ],
  highlights: {
    engagementInc: 14,
    reachInc: 22,
    visitsInc: 8,
    viewsInc: 35,
    topTheme: "Behind the Scenes & Employee Stories",
    growthDriver: "Instagram Reels & LinkedIn Carousels",
  },
  topPosts: [
    { rank: 1, name: "Office Tour 2023", format: "Reel", reach: 15400, engagement: 2100, saves: 450, clicks: 120 },
    { rank: 2, name: "5 Tips for SEO", format: "Carousel", reach: 8900, engagement: 850, saves: 320, clicks: 85 },
    { rank: 3, name: "Meet the CEO", format: "Static", reach: 7200, engagement: 600, saves: 40, clicks: 200 },
    { rank: 4, name: "Product Launch Teaser", format: "Reel", reach: 12000, engagement: 550, saves: 80, clicks: 350 },
    { rank: 5, name: "Q3 Recap", format: "Carousel", reach: 6500, engagement: 480, saves: 120, clicks: 45 },
  ],
  topPostsInsight: "Authentic, human-centric content outperformed polished ads. Educational carousels drove high saves.",
  bottomPosts: [
    { name: "Industry News Update", format: "Static", engagement: "Low", reason: "Topic fatigue / Low relevance" },
    { name: "Quote of the Day", format: "Static", engagement: "Very Low", reason: "Generic content / No clear CTA" },
    { name: "Partner Announcement", format: "Story", engagement: "Avg", reason: "Timing (Posted Sunday 8 AM)" },
  ],
  contentOutput: {
    total: 59,
    reels: 10,
    statics: 18,
    carousels: 12,
    stories: 19,
    consistency: "On-track",
    bestTime: "Tue–Wed–Fri, 6–9 PM",
  },
  engagementStats: {
    totalInteractions: 7400,
    engagementRate: 4.8,
    videoViews: 42000,
    storyCompletion: 82,
    topDriver: "Instagram Reels",
  },
  audience: {
    topCities: "New York, London, Toronto",
    topAges: "25-34 (45%), 35-44 (30%)",
    genderSplit: "55% W / 45% M",
    newFollowers: 850,
    repeatVsNew: "60% Repeat / 40% New",
  },
  traffic: {
    bioClicks: 450,
    storyClicks: 210,
    websiteVisits: 1850,
    topCtaPosts: ["Product Launch Teaser", "Meet the CEO", "Summer Sale End"],
  },
  learnings: [
    "Real, human-centric posts performed best.",
    "Celebration, milestones, and product highlights drove the highest engagement.",
    "Awareness/topical content underperformed due to low relatability.",
    "Posting during peak times (Tue–Wed–Fri, 6–9 PM) improved visibility.",
    "Reels continue to outperform all other formats in reach and saves."
  ]
};