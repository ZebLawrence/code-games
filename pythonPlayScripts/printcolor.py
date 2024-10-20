
class FontStyles:
    REGULAR = 0
    BOLD = 1
    FAINT = 2
    UNDERLINE = 4
    BLINK = 5
    REVERSE = 7
    CONCEALED = 8
class FontColors:
    BLACK = 30
    RED = 31
    GREEN = 32
    YELLOW = 33
    BLUE = 34
    MAGENTA = 35
    CYAN = 36
    WHITE = 37
class BackgroundColors:
    BLACK = 40
    RED = 41
    GREEN = 42
    YELLOW = 43
    BLUE = 44
    MAGENTA = 45
    CYAN = 46
    WHITE = 47

def printWithColor(text, style=FontStyles.BOLD, fontColor=FontColors.GREEN, backgroundColor=BackgroundColors.BLACK):
    print('\x1b[%sm%s\x1b[0m' % (";".join([str(style), str(fontColor), str(backgroundColor)]), text))

def stringColor(text, style=FontStyles.BOLD, fontColor=FontColors.GREEN, backgroundColor=BackgroundColors.BLACK):
    return '\x1b[%sm%s\x1b[0m' % (";".join([str(style), str(fontColor), str(backgroundColor)]), text)

def printBoldBlueOnGreen(text):
    printWithColor(text, FontStyles.BOLD, FontColors.BLUE, BackgroundColors.GREEN)

def printCyanOnGreen(text):
    printWithColor(text, FontStyles.REGULAR, FontColors.CYAN, BackgroundColors.GREEN)

def printBoldYellowOnBlack(text):
    printWithColor(text, FontStyles.BOLD, FontColors.YELLOW, BackgroundColors.BLACK)

def printBold(text):
    print('\x1b[%sm %s \x1b[0m' % (";".join([str(FontStyles.BOLD)]), text))

def printUnderline(text):
    print('\x1b[%sm %s \x1b[0m' % (";".join([str(FontStyles.UNDERLINE)]), text))

def print_format_table():
    """
    prints table of formatted text format options
    """
    for style in range(8):
        ##print(f"Style number: {style}")
        for fg in range(30,38):
            ##print(f"Foreground color: {fg}")
            s1 = ''
            for bg in range(40,48):
                ##print(f"Background color: {bg}")
                format = ';'.join([str(style), str(fg), str(bg)])
                s1 += '\x1b[%sm %s \x1b[0m' % (format, format)
            print(s1)
        print('\n')

# print_format_table()

