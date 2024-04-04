import sys 
# import threading
# import time
# def myFunc():
#    sys.stdout.write("foo")
#    time.sleep(10)
#    sys.exit(0)

# if __name__ == '__main__':
#    myFunc()

def myFunc():
    sys.stdout.buffer.write(bytes("foo", 'utf-8'))
#    time.sleep(10)
#    sys.exit(0)

myFunc()