export interface PlatformMetric {
  platform: string;
  followers: number;
  growth: number;
  impressions: number;
  reach: number;
  interactions: number;
  visits: number;
  views: number;
  posts: number;
}

export interface TopPost {
  rank: number;
  name: string;
  format: 'Reel' | 'Static' | 'Carousel';
  reach: number;
  engagement: number;
  saves: number;
  clicks: number;
}

export interface BottomPost {
  name: string;
  format: string;
  engagement: string;
  reason: string;
}

export interface ContentOutput {
  total: number;
  reels: number;
  statics: number;
  carousels: number;
  stories: number;
  consistency: 'On-track' | 'Needs improvement';
  bestTime: string;
}

export interface ReportData {
  month: string;
  year: string;
  platforms: PlatformMetric[];
  highlights: {
    engagementInc: number;
    reachInc: number;
    visitsInc: number;
    viewsInc: number;
    topTheme: string;
    growthDriver: string;
  };
  topPosts: TopPost[];
  topPostsInsight: string;
  bottomPosts: BottomPost[];
  contentOutput: ContentOutput;
  engagementStats: {
    totalInteractions: number;
    engagementRate: number;
    videoViews: number;
    storyCompletion: number;
    topDriver: string;
  };
  audience: {
    topCities: string;
    topAges: string;
    genderSplit: string;
    newFollowers: number;
    repeatVsNew: string;
  };
  traffic: {
    bioClicks: number;
    storyClicks: number;
    websiteVisits: number;
    topCtaPosts: string[];
  };
  learnings: string[];
}