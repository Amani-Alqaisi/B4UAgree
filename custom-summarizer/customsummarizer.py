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

# Main function to summarize privacy policy
def summarize_keywords(html_content, num_sentences=3):
    text = html_to_text(html_content)

    # Keywords related to data collection and usage
    data_collection_keywords = ['personal information', 'collected', 'information collected', 'how is the information collected']
    usage_keywords = ['how is the information used', 'who will have access to the information']

    # Check for presence of keywords and adjust summary length accordingly
    num_sentences_per_aspect = num_sentences // 3  # Divide equally among aspects
    summary = ""
    for keyword in data_collection_keywords + usage_keywords:
        if re.search(r'\b{}\b'.format(re.escape(keyword)), text, re.IGNORECASE):
            summary += get_summary(text, num_sentences_per_aspect)
    return summary

# Main function to summarize privacy policy using feature selection
def summarize_features(html_content, num_sentences=3):
    text = html_to_text(html_content)

    # Features related to data collection and usage
    data_collection_features = ['personal information', 'collected', 'how is the information collected']
    usage_features = ['how is the information used', 'who will have access to the information']

    # Check for presence of features and adjust summary length accordingly
    num_sentences_per_aspect = num_sentences // 3  # Divide equally among aspects
    summary = ""
    for feature in data_collection_features + usage_features:
        if feature in text.lower():
            summary += get_summary(text, num_sentences_per_aspect)
    return summary


# function in the works from Liam 
def send_summary(result):
    """Function take summary and saves to text file as output/summary.txt."""
    f = open("output/summary.txt", "a", encoding="utf-8")
    f.write(result)
    f.close()