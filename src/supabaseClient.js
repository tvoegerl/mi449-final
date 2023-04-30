
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://viixgzwnkxhlgjqerezc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpaXhnendua3hobGdqcWVyZXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4NzQ4MjMsImV4cCI6MTk5ODQ1MDgyM30.cDmQ46CzYikInyj2SH6JsC3Xeqk-C9LZhSGY8mqFNWI'
export const supabase = createClient(supabaseUrl, supabaseKey);