
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  type?: 'text' | 'flight' | 'hotel' | 'alert';
  data?: any;
}

export interface TripPlan {
  destination: string;
  dates: string;
  budget: number;
  utilization: number;
  itinerary: DayPlan[];
}

export interface DayPlan {
  day: number;
  title: string;
  date: string;
  weather: { temp: string; icon: string };
  events: Event[];
}

export interface Event {
  time: string;
  title: string;
  description: string;
  icon: string;
  type: 'flight' | 'hotel' | 'activity' | 'transport' | 'meeting';
  status?: string;
  insight?: {
    type: 'pro-tip' | 'alert' | 'info';
    text: string;
  };
  imageUrl?: string;
}

export interface AgentHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  latency: string;
  successRate: string;
  hallucinationRate: string;
  icon: string;
}
