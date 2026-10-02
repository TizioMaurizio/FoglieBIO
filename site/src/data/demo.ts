import type { Customer } from '../services/contracts';

// Public demos use these synthetic values only, never visitors' personal details.
export const demoEmail = 'demo@example.com';
export const demoCustomer: Readonly<Customer> = Object.freeze({
  firstName: 'Cliente',
  lastName: 'Dimostrativo',
  email: demoEmail,
  phone: '0000000000',
  address: 'Via Esempio 1',
  city: 'Padova',
  postalCode: '35100',
  province: 'PD',
  country: 'IT',
});
