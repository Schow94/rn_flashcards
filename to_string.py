with open('words.csv', 'r') as file:
    arr = file.readlines()

    newArr = []

    for el in arr:
        newEl = el.replace(',', '')
        
        newArr.append(newEl.replace('\n', ''))
    
    print(newArr)
