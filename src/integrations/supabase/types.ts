export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about: {
        Row: {
          bio: string
          email: string
          id: string
          location: string
          name: string
          profileimageurl: string | null
          sociallinks: Json
          title: string
        }
        Insert: {
          bio: string
          email: string
          id?: string
          location: string
          name: string
          profileimageurl?: string | null
          sociallinks?: Json
          title: string
        }
        Update: {
          bio?: string
          email?: string
          id?: string
          location?: string
          name?: string
          profileimageurl?: string | null
          sociallinks?: Json
          title?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          date: string
          id: string
          issuer: string
          title: string
          url: string | null
        }
        Insert: {
          date: string
          id: string
          issuer: string
          title: string
          url?: string | null
        }
        Update: {
          date?: string
          id?: string
          issuer?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          company: string
          description: string
          duration: string
          id: string
          position: string
        }
        Insert: {
          company: string
          description: string
          duration: string
          id: string
          position: string
        }
        Update: {
          company?: string
          description?: string
          duration?: string
          id?: string
          position?: string
        }
        Relationships: []
      }
      funfacts: {
        Row: {
          id: string
          text: string
        }
        Insert: {
          id: string
          text: string
        }
        Update: {
          id?: string
          text?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          demourl: string | null
          description: string
          githuburl: string | null
          id: string
          imageurl: string | null
          technologies: string[]
          title: string
        }
        Insert: {
          demourl?: string | null
          description: string
          githuburl?: string | null
          id: string
          imageurl?: string | null
          technologies: string[]
          title: string
        }
        Update: {
          demourl?: string | null
          description?: string
          githuburl?: string | null
          id?: string
          imageurl?: string | null
          technologies?: string[]
          title?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          company: string
          id: string
          name: string
          position: string
          text: string
        }
        Insert: {
          company: string
          id: string
          name: string
          position: string
          text: string
        }
        Update: {
          company?: string
          id?: string
          name?: string
          position?: string
          text?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          id: string
          level: number
          name: string
        }
        Insert: {
          category: string
          id: string
          level: number
          name: string
        }
        Update: {
          category?: string
          id?: string
          level?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
