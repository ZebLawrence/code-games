from printcolor import *

def printArray(array):
    result = "["

    for i in range(len(array)):
        item = array[i]
        itemType = type(item)

        # print(f"item: {item}, itemType: {itemType}")

        match itemType:
            case true if itemType == int:
                result += stringColor(item, style=FontStyles.BOLD, fontColor=FontColors.CYAN)
            case true if itemType == str:
                result += stringColor(f"\"{item}\"", style=FontStyles.BOLD, fontColor=FontColors.MAGENTA)
            case true if itemType == tuple:
                result += stringColor(item, style=FontStyles.BOLD, fontColor=FontColors.YELLOW)
            case true if itemType == list:
                result += stringColor(item, style=FontStyles.BOLD, fontColor=FontColors.GREEN)
            case true if itemType == dict:
                result += stringColor(item, style=FontStyles.BOLD, fontColor=FontColors.RED)
            case true if itemType == bool:
                result += stringColor(item, style=FontStyles.BOLD, fontColor=FontColors.BLUE)
            case _:
                result += stringColor(item, style=FontStyles.BOLD, fontColor=FontColors.WHITE, backgroundColor=BackgroundColors.BLUE)

        if i != len(array) - 1:
            result += ", "
    result += "]"
    print(result)

def sortAllTypes(value):
    itemType = type(value)
    result = 0
    match itemType:
        # case true if (itemType == int | itemType == float | itemType == complex | itemType == str):
        case true if itemType == int:
            result = value
        case true if itemType == float:
            result = value
        case true if itemType == float:
            result = value
        case _:
            result = float('inf')

    # print(f"value: {value}, itemType: {itemType}, result: {result}")
    return result


def filterByType(array, type):
    return list(filter(lambda x: isinstance(x, type), array))
