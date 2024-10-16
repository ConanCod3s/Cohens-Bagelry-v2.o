import { AvailableType } from "./Types";

const bagels: AvailableType[] = [
    { type: 'bagel', value: 'Plain', label: 'Plain', quantity: 0, cost: 0.27, maxQuantity: 12, weight: 125 },
    { type: 'bagel', value: 'Everything', label: 'Everything', quantity: 0, cost: 0.29, maxQuantity: 12, weight: 125 },
    { type: 'bagel', value: 'Poppy Seed', label: 'Poppy Seed', quantity: 0, cost: 0.29, maxQuantity: 12, weight: 125 },
    { type: 'bagel', value: 'Sesame Seed', label: 'Sesame Seed', quantity: 0, cost: 0.29, maxQuantity: 12, weight: 125 },
    { type: 'bagel', value: 'Chocolate Chip', label: 'Chocolate Chip', quantity: 0, cost: 0.45, maxQuantity: 12, weight: 125 },
    { type: 'bagel', value: 'Cinnamon Sugar', label: 'Cinnamon Sugar', quantity: 0, cost: 0.34, maxQuantity: 12, weight: 125 },
];

const sourdough: AvailableType[] = [
    { type: 'sourdough', value: 'Small Sourdough Loaf', label: 'Small', quantity: 0, cost: 2.50, maxQuantity: 1, weight: 450 },
];

const actionCodeSettings = {
    url: 'https://cohensbagelry.com',
    handleCodeInApp: true,
};

export { bagels, sourdough, actionCodeSettings };
