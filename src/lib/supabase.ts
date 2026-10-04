import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ioetbtpqupyxtoeazesd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZXRidHBxdXB5eHRvZWF6ZXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMTIyNzIsImV4cCI6MjEwNjY4ODI3Mn0.GTtebFmafle5Q2Xmh548vkwPEqLNQ_LXkqcjs2Grl6I";

export const supabase = createClient(supabaseUrl, supabaseKey);