import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client only if credentials are available
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Types for our database tables
export interface ContentItem {
  id: string;
  platform: 'tiktok' | 'xiaohongshu' | 'youtube';
  external_id: string;
  url: string;
  embed_code: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  title: string | null;
  description: string | null;
  creator_name: string | null;
  creator_url: string | null;
  creator_avatar: string | null;
  likes: number;
  shares: number | null;
  comments: number | null;
  views: number | null;
  scraped_at: string;
  is_active: boolean;
  trending_score: number;
  raw_data: Record<string, unknown> | null;
}

export interface ScrapeRun {
  id: string;
  platform: string;
  started_at: string;
  completed_at: string | null;
  status: string;
  items_found: number;
  error_message: string | null;
}

export type Platform = ContentItem['platform'];
export type SortOption = 'trending' | 'recent' | 'likes';
