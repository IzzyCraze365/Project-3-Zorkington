
//TODO START OF CLASSES 'Pantry Example'
class LocationItems {
  constructor(initialItems) {
    this.inventory = initialItems;
  }

  // Prints the current Inventory
  displayInventory() {
    console.log(
      "The current items are " + this.inventory
    );
  }

  //Adds an item to the inventory
  addInventory(itemToBeAdded) {
    this.inventory.push(itemToBeAdded);
  }

  //This checks to see if something was removed by comparing the length before and after
  removeInventory(itemToBeRemoved) {
    let snapshotInventorySize = this.inventory.length;
    this.inventory = this.inventory.filter((item) => item !== itemToBeRemoved);
    return snapshotInventorySize === this.inventory.length
      ? "No Items were removed"
      : "Item was removed";
  }
}

let playerBackpack = new LocationItems(["beans", "noodles", "peanut butter"]);

playerBackpack.addInventory("fries");
console.log(playerBackpack.removeInventory("beanz")); // "beanz" will not remove anything
playerBackpack.displayInventory();
//TODO END OF CLASSES
