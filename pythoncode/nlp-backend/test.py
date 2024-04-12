from privacysummarizer import get_summary, send_summary

# add get text argument


f_g=open('/Users/walshlia/Documents/GitHub/B4UAgree/test-privacy/privacy/grinnell_privacy.txt','r')
rawText_grinnell=f_g.read()
#run method and print result
resultSum = get_summary(rawText_grinnell,4)
send_summary(result=resultSum)
