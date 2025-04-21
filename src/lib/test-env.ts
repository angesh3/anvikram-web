import { supabase } from './supabase';
import { openai } from './openai';

export async function testConnections() {
  try {
    // Test Supabase connection
    console.log('Testing Supabase connection...');
    
    // First, try to create a test table if it doesn't exist
    try {
      const { error: createError } = await supabase.rpc('create_test_table', {
        table_name: '_test'
      });

      if (createError) {
        console.log('Test table creation skipped:', createError.message);
      }
    } catch (err: any) {
      console.log('Test table creation failed:', err.message);
    }

    // Then try to query the table
    const { data: supabaseTest, error: supabaseError } = await supabase
      .from('_test')
      .select('*')
      .limit(1);

    if (supabaseError) {
      console.error('Supabase connection error:', {
        message: supabaseError.message,
        code: supabaseError.code,
        details: supabaseError.details,
        hint: supabaseError.hint,
      });
      throw new Error(`Supabase connection failed: ${supabaseError.message}`);
    } else {
      console.log('Supabase connection successful');
    }

    // Test OpenAI connection
    console.log('Testing OpenAI connection...');
    try {
      const models = await openai.models.list();
      console.log('OpenAI connection successful, available models:', models.data.length);
    } catch (openaiError: any) {
      console.error('OpenAI connection error:', {
        message: openaiError.message,
        code: openaiError.code,
        type: openaiError.type,
      });
      throw new Error(`OpenAI connection failed: ${openaiError.message}`);
    }
  } catch (error: any) {
    console.error('Error in testConnections:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    throw error;
  }
} 