export type Database = {
  public: {
    Tables: {
      prompts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;

          title: string;
          content: string;
          category: string;

          favorite: boolean;

          user_id: string | null;
        };

        Insert: {
          title: string;
          content: string;
          category?: string;
          favorite?: boolean;
          user_id?: string | null;
        };

        Update: {
          title?: string;
          content?: string;
          category?: string;
          favorite?: boolean;
          user_id?: string | null;
        };
      };
    };
  };
};