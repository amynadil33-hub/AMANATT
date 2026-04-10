import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://zneyghmmqrmzfpvqyecg.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRiNmMwNDM3LTQxZTktNDdmYS04YTIzLTEyYmEwZWRlODE0OSJ9.eyJwcm9qZWN0SWQiOiJ6bmV5Z2htbXFybXpmcHZxeWVjZyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc1ODA0NzM5LCJleHAiOjIwOTExNjQ3MzksImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.52lYuDAdTX1PPZKwGevCubELa8ZxfIYHoCo-xvxczr4';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };