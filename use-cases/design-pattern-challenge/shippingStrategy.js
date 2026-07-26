// Strategy interface represented by separate strategy classes.

/**
 * Strategy for standard shipping.
 */
class StandardShippingStrategy {
  calculate(packageDetails, destinationCountry) {
    const { weight, length, width, height } = packageDetails;

    const rates = {
      USA: 2.5,
      Canada: 3.5,
      Mexico: 4.0,
    };

    const rate = rates[destinationCountry] ?? 4.5;
    let cost = weight * rate;

    const packageVolume = length * width * height;

    if (weight < 2 && packageVolume > 1000) {
      cost += 5.0;
    }

    return cost.toFixed(2);
  }
}

/**
 * Strategy for express shipping.
 */
class ExpressShippingStrategy {
  calculate(packageDetails, destinationCountry) {
    const { weight, length, width, height } = packageDetails;

    const rates = {
      USA: 4.5,
      Canada: 5.5,
      Mexico: 6.0,
    };

    const rate = rates[destinationCountry] ?? 7.5;
    let cost = weight * rate;

    const packageVolume = length * width * height;

    if (packageVolume > 5000) {
      cost += 15.0;
    }

    return cost.toFixed(2);
  }
}

/**
 * Strategy for overnight shipping.
 */
class OvernightShippingStrategy {
  calculate(packageDetails, destinationCountry) {
    const { weight } = packageDetails;

    const rates = {
      USA: 9.5,
      Canada: 12.5,
    };

    const rate = rates[destinationCountry];

    if (rate === undefined) {
      return "Overnight shipping not available for this destination";
    }

    const cost = weight * rate;

    return cost.toFixed(2);
  }
}

/**
 * Context class that selects and executes a shipping strategy.
 */
class ShippingCostCalculator {
  constructor() {
    this.strategies = {
      standard: new StandardShippingStrategy(),
      express: new ExpressShippingStrategy(),
      overnight: new OvernightShippingStrategy(),
    };
  }

  calculateShippingCost(
    packageDetails,
    destinationCountry,
    shippingMethod
  ) {
    const strategy = this.strategies[shippingMethod];

    // Preserve the behaviour of the original function.
    if (!strategy) {
      return "0.00";
    }

    return strategy.calculate(packageDetails, destinationCountry);
  }
}

// Convenience function that maintains the same interface
// as the original calculator.
function calculateShippingCost(
  packageDetails,
  destinationCountry,
  shippingMethod
) {
  const calculator = new ShippingCostCalculator();

  return calculator.calculateShippingCost(
    packageDetails,
    destinationCountry,
    shippingMethod
  );
}

module.exports = {
  StandardShippingStrategy,
  ExpressShippingStrategy,
  OvernightShippingStrategy,
  ShippingCostCalculator,
  calculateShippingCost,
};