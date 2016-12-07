#coding=UTF8

# import sys
# statement = sys.argv[1] #this is arg1 

# # lines = read_in()
# tokenized_statement = segmenter.tokenize(u'暖かや背の子の言葉聞きながし')
# print(tokenized_statement)
# # sys.stdout.flush()

import tinysegmenter
statement = '春風や堤ごしなる牛の声．'
tokenized_statement = tinysegmenter.tokenize(statement)
print(tokenized_statement)
