import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://bfgrvjqyofoiqodjicgf.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmZ3J2anF5b2ZvaXFvZGppY2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MzQzMTksImV4cCI6MTk4NDAxMDMxOX0.VazPhWcInKnLcJeZ5RD3Aki3pJRkCB7Sp1QvfxLO85c"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*")
        }
    }
}