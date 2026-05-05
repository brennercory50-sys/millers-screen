import type { LeadFormData } from './validations'

export type LeadScore = 'HOT' | 'WARM' | 'COLD'

export interface ScoreResult {
  score: LeadScore
  points: number
  reasons: string[]
  emoji: string
}

const HIGH_VALUE_PROJECTS = ['Pool Enclosure', 'MegaView® Enclosure', 'Screen Room']

export function scoreLead(lead: Partial<LeadFormData>): ScoreResult {
  let points = 0
  const reasons: string[] = []

  if (lead.projectType && HIGH_VALUE_PROJECTS.includes(lead.projectType)) {
    points += 3
    reasons.push(`high-value project (${lead.projectType})`)
  } else if (lead.projectType) {
    points += 1
  }

  switch (lead.timeline) {
    case 'ASAP':
      points += 4
      reasons.push('urgent timeline')
      break
    case '1–3 months':
      points += 2
      reasons.push('1-3 month timeline')
      break
    case '3–6 months':
      points += 1
      break
    case 'Just researching':
      points -= 1
      break
  }

  switch (lead.budget) {
    case '$35k+':
      points += 3
      reasons.push('$35k+ budget')
      break
    case '$20k–$35k':
      points += 2
      reasons.push('$20k–$35k budget')
      break
    case '$10k–$20k':
      points += 1
      break
    case 'Under $10k':
      points += 0
      break
    case 'Not sure yet':
      points += 0
      break
  }

  if (lead.message && lead.message.trim().length > 80) {
    points += 1
    reasons.push('detailed message')
  }

  if (lead.city && lead.city.trim().length > 0) {
    points += 1
  }

  let score: LeadScore
  let emoji: string
  if (points >= 7) {
    score = 'HOT'
    emoji = '🔥'
  } else if (points >= 3) {
    score = 'WARM'
    emoji = '⭐'
  } else {
    score = 'COLD'
    emoji = '❄️'
  }

  return { score, points, reasons, emoji }
}
