
from printcolor import *

def printArray(array):
    result = "["
    for i in range(len(array)):
        item = array[i]
        if type(item) == int:
            result += stringColor(item, style=FontStyles.BOLD, fontColor=FontColors.CYAN)
        elif type(item) == str:
            result += stringColor(f"\"{item}\"", style=FontStyles.BOLD, fontColor=FontColors.MAGENTA)
        
        if i != len(array) - 1:
            result += ", "
    result += "]"
    print(result)

# print_format_table()
# declare an array in python
starting_array = ["3", 4, 7, "1", 6 , 9, 2, "5", 8, 10, "0"]
printArray(starting_array)
# printBoldYellowOnBlack(f"Array: {starting_array}")

# # sort the array
# # print the sorted array
# starting_array.sort(reverse=True)
# printBoldYellowOnBlack(f"Sorted array: {starting_array}")

# # print the first element of the array
# printBoldYellowOnBlack(f"First element: {starting_array[0]}")

# # print the last element of the array
# printBoldYellowOnBlack(f"Last element: {starting_array[-1]}")

# # print the first 3 elements of the array
# printBoldYellowOnBlack(f"First 3 elements: {starting_array[0:3]}")

# # print the last 3 elements of the array
# printBoldYellowOnBlack(f"Last 3 elements: {starting_array[-3:]}")

# # rpint every Nth element of the array
# printBoldYellowOnBlack(f"Every 2nd element: {starting_array[::2]}")

# # print the array in reverse order
# print(f"Array in reverse: {starting_array[::-1]}")

# # delete the first and lat elements of the array
# del starting_array[0]
# del starting_array[-1]
# print(f"Array after deleting first and last elements: {starting_array}")

# # add an element to the end of the array
# starting_array.append(100)
# print(f"Array after adding an element to the end: {starting_array}")

# # add an element to the beginning of the array
# starting_array.insert(0, 200)
# print(f"Array after adding an element to the beginning: {starting_array}")





