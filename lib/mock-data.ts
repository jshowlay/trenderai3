import type { Trend, SparklineDataPoint } from '@/types/trends';

function generateSparklineData(): SparklineDataPoint[] {
  const data: SparklineDataPoint[] = [];
  const baseVelocity = Math.random() * 40 + 30; // 30-70 base
  
  for (let i = 1; i <= 7; i++) {
    const variation = (Math.random() - 0.5) * 20; // -10 to +10 variation
    const velocity = Math.max(0, Math.min(100, baseVelocity + variation + (i * 2))); // Slight upward trend
    data.push({
      timestamp: i,
      velocity: Math.round(velocity)
    });
  }
  
  return data;
}

const trendTemplates = [
  {
    name: 'AI Agents',
    description: 'Autonomous AI systems that can perform complex tasks without human intervention',
    category: 'Technology',
    tags: ['AI', 'Automation', 'Machine Learning', 'Productivity'],
  },
  {
    name: 'Quantum Computing',
    description: 'Revolutionary computing technology using quantum mechanical phenomena',
    category: 'Technology', 
    tags: ['Quantum', 'Computing', 'Research', 'IBM', 'Google'],
  },
  {
    name: 'Climate Technology',
    description: 'Innovative solutions addressing climate change and environmental challenges',
    category: 'Science',
    tags: ['Climate', 'Environment', 'Green Tech', 'Sustainability'],
  },
  {
    name: 'Decentralized Identity',
    description: 'Self-sovereign identity systems built on blockchain technology',
    category: 'Technology',
    tags: ['Blockchain', 'Identity', 'Privacy', 'Security', 'Web3'],
  },
  {
    name: 'Synthetic Biology',
    description: 'Engineering biological systems for manufacturing, medicine, and agriculture',
    category: 'Science',
    tags: ['Biology', 'Engineering', 'Medicine', 'Manufacturing'],
  },
  {
    name: 'Edge Computing',
    description: 'Distributed computing paradigm bringing computation closer to data sources',
    category: 'Technology',
    tags: ['Computing', 'Infrastructure', '5G', 'IoT', 'Latency'],
  },
  {
    name: 'Digital Twins',
    description: 'Real-time digital replicas of physical objects and systems',
    category: 'Technology',
    tags: ['IoT', 'Simulation', 'Manufacturing', 'Predictive', 'Analytics'],
  },
  {
    name: 'Vertical Farming',
    description: 'Indoor agriculture using vertically stacked layers and controlled environments',
    category: 'Agriculture',
    tags: ['Agriculture', 'Sustainability', 'Urban', 'Food Security'],
  },
  {
    name: 'Brain-Computer Interfaces',
    description: 'Direct communication pathways between brain and external devices',
    category: 'Technology',
    tags: ['Neuroscience', 'Interface', 'Medical', 'Accessibility'],
  },
  {
    name: 'Autonomous Delivery',
    description: 'Self-driving vehicles and drones for package and food delivery',
    category: 'Transportation',
    tags: ['Autonomous', 'Logistics', 'Drones', 'Last Mile', 'AI'],
  },
];

export function generateMockTrends(): Trend[] {
  return trendTemplates.map((template, index) => {
    const velocity = Math.floor(Math.random() * 40) + 60; // 60-100
    const velocityChange = Math.floor(Math.random() * 20) - 5; // -5 to +15
    const confidence = Math.floor(Math.random() * 30) + 70; // 70-100
    const riskScore = Math.floor(Math.random() * 60) + 20; // 20-80
    
    return {
      id: `trend-${index + 1}`,
      name: template.name,
      description: template.description,
      category: template.category,
      velocity,
      velocityChange,
      signals: [], // Would be populated with actual signal data
      tags: template.tags,
      discoveredAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
      lastUpdated: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(), // Last 24 hours
      confidence,
      riskScore,
      timeWindow: '7d',
      sparklineData: generateSparklineData(),
    };
  });
}