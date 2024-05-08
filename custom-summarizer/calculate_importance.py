import json
import os

def calculate_importance(paragraph):
    """
    Calculate the importance score of a paragraph based on the average score of its words 
    as defined in the privacy policy settings.

    Args:
    - paragraph (str): The input paragraph to analyze.

    Returns:
    - float: The average importance score of the paragraph.
    """
    # Read privacy policy settings from 'settings.json'
    with open(os.path.join(os.path.dirname(__file__), 'settings.json')) as json_file:
        privacy_policy_settings = json.load(json_file)

    # Initialize variables to store accumulated score and word count
    total_score = 0
    total_words = 0

    # Iterate through each privacy policy category
    for category in privacy_policy_settings['settings']['data']:
        # Retrieve the value assigned to the category
        category_value = privacy_policy_settings['settings']['data'][category]['value']

        # Iterate through words in the category
        for word in privacy_policy_settings['settings']['data'][category]['words']:
            # Check if the word exists in the paragraph
            if word in paragraph:
                # Accumulate the value assigned to the word
                total_score += category_value
                total_words += 1

    # Calculate the average score
    if total_words > 0:
        average_score = total_score / total_words
    else:
        average_score = 0

    return average_score