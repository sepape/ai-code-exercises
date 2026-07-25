Traceback (most recent call last):
  File "/home/user/projects/inventory/stock_manager.py", line 25, in <module>
    main()
  File "/home/user/projects/inventory/stock_manager.py", line 17, in main
    print_inventory_report(items)
  File "/home/user/projects/inventory/stock_manager.py", line 10, in print_inventory_report
    for i in range(len(items)):
      print(f"Item {i+1}: {items[i]['name']} - Quantity: {items[i]['quantity']}")
IndexError: list index out of range