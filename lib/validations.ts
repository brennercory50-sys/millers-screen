import { z } from 'zod'

export const LEAD_PROJECT_TYPES = [
  'Pool Enclosure',
  'Screen Room',
  'MegaView® Enclosure',
  'Rescreen',
  'Repair',
  'Other',
] as const

export const LEAD_TIMELINES = [
  'ASAP',
  '1–3 months',
  '3–6 months',
  'Just researching',
] as const

export const LEAD_BUDGETS = [
  'Under $10k',
  '$10k–$20k',
  '$20k–$35k',
  '$35k+',
  'Not sure yet',
] as const

export const leadSchema = z.object({
  fullName: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  phone: z.string().min(10, 'Valid phone number is required').max(20, 'Phone number is too long'),
  email: z.string().email('Valid email address is required'),
  projectType: z.enum(LEAD_PROJECT_TYPES, {
    errorMap: () => ({ message: 'Valid project type is required' }),
  }),
  city: z.string().max(100, 'City name is too long').optional().default(''),
  message: z.string().max(2000, 'Message is too long').optional().default(''),
  source: z.string().max(50).optional().default(''),
  utm: z.record(z.string().max(200)).optional().default({}),
  timeline: z.string().max(50).optional().default(''),
  budget: z.string().max(50).optional().default(''),
})

export type LeadFormData = z.infer<typeof leadSchema>

export function validateLeadRequest(data: unknown):
  | { success: true; data: LeadFormData }
  | { success: false; error: string; errors: Record<string, (string | undefined)[]> }
{
  const result = leadSchema.safeParse(data)

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    const firstError = Object.values(errors).flat()[0]

    return {
      success: false,
      error: firstError ?? 'Invalid request data',
      errors,
    }
  }

  return {
    success: true,
    data: result.data,
  }
}
