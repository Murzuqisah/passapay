import { z } from 'zod';

// Email validation schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email is too long')
    .toLowerCase()
    .trim(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// Sanitize and validate email input
export function validateEmail(email: string): { success: boolean; data?: string; error?: string } {
  try {
    const result = newsletterSchema.parse({ email });
    return { success: true, data: result.email };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Invalid email format' };
  }
}

// Mock newsletter subscription (replace with actual API call)
export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock success/failure for demo
  if (email.includes('test@')) {
    return { success: false, message: 'This email is already subscribed' };
  }
  
  // In production, this would call your newsletter service API
  return { success: true, message: 'Successfully subscribed to newsletter!' };
}