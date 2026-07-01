export type Prompt = {
  id: string;
  created_at: string;
  updated_at: string;

  title: string;
  content: string;
  category: string;

  favorite: boolean;

  user_id: string | null;
};

export type CreatePromptInput = {
  title: string;
  content: string;
  category: string;
};

export type UpdatePromptInput = {
  title?: string;
  content?: string;
  category?: string;
  favorite?: boolean;
};