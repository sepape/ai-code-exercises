function processInventory(requestedItems, inventory, quantityRequested) {
  const fulfilledItems = [];
  let totalCost = 0;

  for (const requestedItem of requestedItems) {
    let itemFound = false;

    for (const inventoryItem of inventory) {
      if (requestedItem.id === inventoryItem.id) {
        itemFound = true;

        if (inventoryItem.q >= quantityRequested) {
          fulfilledItems.push(requestedItem);
          totalCost += requestedItem.p * quantityRequested;
          inventoryItem.q -= quantityRequested;
        }

        break;
      }
    }

    if (!itemFound) {
      console.log(`Item ${requestedItem.id} not available`);
    }
  }

  return {
    s: fulfilledItems,
    t: totalCost
  };
}

module.exports = { processInventory };