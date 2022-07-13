// Create the inventory
import { Inventory } from './Inventory';
import { Item } from './Item';
import { Sword } from './Sword';
import { ItemWeightComparator } from './ItemWeightComparator';
import { Pizza } from './Pizza';

const inventory: Inventory = new Inventory();

// Create a set of items
const a: Item = new Sword({
  baseDamage: 30.4219,
  baseDurability: 0.7893,
  value: 300,
  weight: 2.032
});
const b: Item = new Sword({
  baseDamage: 40,
  baseDurability: 0.7893,
  value: 200,
  weight: 2
});
const c: Item = new Sword({
  baseDamage: 40,
  baseDurability: 1,
  value: 1,
  weight: 3
});
const pizza: Item = new Pizza({
  numberOfSlices: 12,
  spoiled: false
});


// Add the items to the inventory
inventory.addItem(a);
inventory.addItem(b);
inventory.addItem(c);
inventory.addItem(pizza);

// Display the inventory
console.log(inventory.toString());

// Sort by natural order
inventory.sort();

// Display the new inventory
console.log(inventory.toString());

// Sort by weight
inventory.sort(new ItemWeightComparator());

// Display the inventory again
console.log(inventory.toString());

// Use the sword
console.log(a.use());
console.log(a.use());
