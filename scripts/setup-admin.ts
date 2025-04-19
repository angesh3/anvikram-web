import 'dotenv/config';
import { signUp } from '../src/lib/auth';
import type { UserRole } from '../src/types/auth';

async function setupAdmin() {
  try {
    console.log('Setting up admin user...');
    
    const email = 'angeshvikram@gmail.com';
    const password = 'Admin123!@#';  // More complex password that meets requirements

    const user = await signUp(email, password, 'admin' as UserRole);
    
    if (user) {
      console.log('Admin user created successfully:', user);
      console.log('\nYou can now log in with:');
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    } else {
      console.error('Failed to create admin user');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error setting up admin user:', error);
    process.exit(1);
  }
}

setupAdmin(); 