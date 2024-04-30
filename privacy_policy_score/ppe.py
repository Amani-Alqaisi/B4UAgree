# Note: the privacy policy needs to be in a .txt file
# Instructions to get the privacy policy score:
# python setup.py
# pip install sklearn
# python ppe.py evaluate "path to .txt file"
# Output: Float score ranging from 0-10
from privacy_policy_evaluator import paragraphing, commands, preprocessing, helpers, wordscoring
from typing import Callable


def main(args=None):
    """
    Main Starting Code
    """
    # Parse input
    args = commands.parser.parse_args(args)
    try:
        # Select the function in this document that is the first argument
        arg_func: Callable = globals()[args.function]
        # Call the function
        arg_func(args)
    except KeyError:
        commands.parser.parse_args(['-h'])
        pass

def evaluate(args):
    """
    Evaluate a score
    :param args:
    """
    # Read textfile
    text = helpers.read_file(args.file)
    # Get the Score
    score = wordscoring.score_text(text)
    print(score['mean_privacy'])


if __name__ == '__main__':
    main()
