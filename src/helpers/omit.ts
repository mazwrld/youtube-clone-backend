function Omit<T extends object>(
  obj: T,
  property: ('password' | '__v')[]
): Omit<T, 'password' | '__v'> {
  if (Array.isArray(property)) {
    const entries = Object.entries(obj).filter(item => {
      const [key] = item;
      return !property.includes(key as 'password' | '__v');
    });
    return Object.fromEntries(entries) as Omit<T, 'password' | '__v'>;
  }
  const { [property]: unused, ...rest } = obj;
  return rest as Omit<T, 'password' | '__v'>;
}

export default Omit;
