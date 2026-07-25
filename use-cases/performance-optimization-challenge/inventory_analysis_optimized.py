import random
import time


def find_product_combinations(products, target_price, price_margin=10):
    """
    Find unique pairs of products whose combined price falls within
    the target price range.
    """
    results = []

    minimum_price = target_price - price_margin
    maximum_price = target_price + price_margin

    for i in range(len(products)):
        product1 = products[i]

        for j in range(i + 1, len(products)):
            product2 = products[j]

            combined_price = product1["price"] + product2["price"]

            if minimum_price <= combined_price <= maximum_price:
                results.append(
                    {
                        "product1": product1,
                        "product2": product2,
                        "combined_price": combined_price,
                        "price_difference": abs(
                            target_price - combined_price
                        ),
                    }
                )

    results.sort(key=lambda item: item["price_difference"])
    return results


if __name__ == "__main__":
    random.seed(42)

    product_list = []

    for i in range(5000):
        product_list.append(
            {
                "id": i,
                "name": f"Product {i}",
                "price": random.randint(5, 500),
            }
        )

    start_time = time.perf_counter()

    combinations = find_product_combinations(
        product_list,
        target_price=500,
        price_margin=50,
    )

    end_time = time.perf_counter()

    print(f"Found {len(combinations)} product combinations")
    print(f"Optimized execution time: {end_time - start_time:.4f} seconds")