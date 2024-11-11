
from arrayUtils import *


# declare an array in python
starting_array = [
    "3", 4, 7, "1", 6 , 9, 2, "5", 8, 10, "0", 
    (1, 2, 3), 
    [4, 5, 6], 
    {"key": "value"}, 
    True, 
    False
    ]
printArray(starting_array)
printBoldWhiteOnBlue("Starting Array")
printBoldWhiteOnBlue("Array:")
printArray(starting_array)

# sort the array
# print the sorted array
starting_array.sort(key=sortAllTypes)
printBoldWhiteOnBlue("Sorted array:")
printArray(starting_array)

# print the first element of the array
printBoldWhiteOnBlue("First element:")
printArray([starting_array[0]])

# print the last element of the array
printBoldWhiteOnBlue("Last element:")
printArray([starting_array[-1]])

# print the first 3 elements of the array
printBoldWhiteOnBlue("First 3 elements:")
printArray(starting_array[0:3])

# print the last 3 elements of the array
printBoldWhiteOnBlue("Last 3 elements:")
printArray(starting_array[-3:])

# rpint every Nth element of the array
printBoldWhiteOnBlue("Every 2nd element:")
printArray(starting_array[::2])

# print the array in reverse order
printBoldWhiteOnBlue(" in reverse:")
printArray(starting_array[::-1])

# delete the first and lat elements of the array
del starting_array[0]
del starting_array[-1]
printBoldWhiteOnBlue(f"Array after deleting first and last elements:")
printArray(starting_array)

# add an element to the end of the array
starting_array.append(100)
printBoldWhiteOnBlue(f"Array after adding an element to the end:")
printArray(starting_array)

# add an element to the beginning of the array
starting_array.insert(0, 200)
printBoldWhiteOnBlue(f"Array after adding an element to the beginning:")
printArray(starting_array)

printBoldWhiteOnBlue("Sort after new items")
starting_array.sort(key=sortAllTypes)
printArray(starting_array)

# adding the false bool back to the array
starting_array.append(False)

# all ints in array
printBoldWhiteOnBlue("All ints in array")
printArray(filterByType(starting_array, int))

# all strings in array
printBoldWhiteOnBlue("All strings in array")
printArray(filterByType(starting_array, str))

# all lists in array
printBoldWhiteOnBlue("All lists in array")
printArray(filterByType(starting_array, list))

# all tuples in array
printBoldWhiteOnBlue("All tuples in array")
printArray(filterByType(starting_array, tuple))

# all dicts in array
printBoldWhiteOnBlue("All dicts in array")
printArray(filterByType(starting_array, dict))

# all bools in array
printBoldWhiteOnBlue("All bools in array")
printArray(filterByType(starting_array, bool))

