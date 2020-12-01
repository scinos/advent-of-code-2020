export const massToFuel = (mass: number): number => Math.floor(mass / 3) - 2;

export const massToFuelComplex = (mass: number): number => {
  let subtotal = massToFuel(mass);
  let total = subtotal;
  while (subtotal > 0) {
    subtotal = Math.max(0, massToFuel(subtotal));
    total += subtotal;
  }
  return total;
};
