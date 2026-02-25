export function skillLevelSeverity(level?: string) {
  switch (level) {
    case 'expert':
      return 'success'
    case 'advanced':
      return 'info'
    case 'intermediate':
      return 'warn'
    default:
      return 'secondary'
  }
}
