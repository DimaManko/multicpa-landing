export const getEnv = (name: 'VITE_API_URL' | 'VITE_API_KEY'): string => {
  const value: unknown = import.meta.env[name]

  if (typeof value !== 'string' || value === '') {
    throw new Error(`${name} is not set`)
  }

  return value
}
