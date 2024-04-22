"""Module providing a function for sumerizing and bs4 is for webscrapeing."""
from summarizer.sbert import SBertSummarizer
from bs4 import BeautifulSoup, NavigableString, Tag
import os 
import re


# update_html content with created summary
def update_html(summary): 
    """Function take html from file and put it into text"""
    base = os.path.dirname(os.path.abspath(__file__))
    html = open(os.path.join(base, "index.html"))
    soup = BeautifulSoup(html, "html.parser")
    old_text = soup.find('p', id='content')
    tag = soup.new_tag("p", id='content')
    tag.string = summary
    old_text.replace_with(tag)
    with open("index.html", "wb") as f_output:
        f_output.write(soup.prettify("utf-8"))

# in the works function from Liam                              
def html_to_text(html):
    """Function take html file and extract given text to output/privacyPolicy.txt"""
    f = open("output/privacyPolicy.txt", "a", encoding="utf-8")
    soup = BeautifulSoup(html, 'html.parser')
    for header in soup.find_all({'h3','h2','h1'}):
        next_node = header
        while True:
            next_node = next_node.nextSibling
            if next_node is None:
                break
            if isinstance(next_node,NavigableString ):
                print (next_node.strip())
            if isinstance(next_node, Tag):
                if next_node.name == "h2"or next_node.name == "h1" or next_node.name == "h3" :
                    #print(soup.find(string=nextNode.text.strip()))
                    break
                f.write(next_node.get_text(strip=True).strip())
    f.close()

# compute summary from SBertSummarizer
def get_summary(text,num_sentences):
    """Function take text file and outputs given sumary of said text useing nlp model. Can custuimze number of sentances of output with num_sentences. """
    model = SBertSummarizer('paraphrase-MiniLM-L6-v2')
    result = model(text, num_sentences=num_sentences)
    update_html(result)
    return result

# function in the works from Liam 
def send_summary(result):
    """Function take summary and saves to text file as output/summary.txt."""
    f = open("output/summary.txt", "a", encoding="utf-8")
    f.write(result)
    f.close()