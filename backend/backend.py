import http.client
import urllib.parse
import json
import time
import numpy as np
import re
import requests
import nltk
from flair.data import Sentence
from flair.embeddings import WordEmbeddings, DocumentPoolEmbeddings
from sklearn.metrics.pairwise import cosine_similarity


def is_difference_large(text1: str, text2: str) -> bool:
    text1_preprocessed = Sentence(text1)
    text2_preprocessed = Sentence(text2)

    glove_embedding = WordEmbeddings('glove')
    document_embedding = DocumentPoolEmbeddings([glove_embedding])
    document_embedding.embed(text1_preprocessed)
    document_embedding.embed(text2_preprocessed)

    text1_embedding = text1_preprocessed.get_embedding()
    text2_embedding = text2_preprocessed.get_embedding()
    text1_embedding = np.reshape(text1_embedding, (-1, 1))
    text2_embedding = np.reshape(text2_embedding, (-1, 1))
    similarity = cosine_similarity(text1_embedding, text2_embedding)
    # Some example treshold
    # TODO: Determine a good threshold for example in pitch
    if np.mean(similarity) > 0.06:
        return False
    else:
        return True


def which_paragraph_changed(text: str) -> list:
    list_of_paragraphs = re.findall(r"[^#]+", text)
    has_changes = [_check_if_has_diff(paragraph) for paragraph in list_of_paragraphs]
    return has_changes


def _check_if_has_diff(text: str) -> bool:
    diff_tokens = ["<ins>", "<del>"]
    return any(diff_token in text for diff_token in diff_tokens)


def keyphrase_extraction(text: str) -> list:
    key_phrase_api_url = "https://westeurope.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases"
    documents = {'documents': [
        {'id': '1', 'language': 'en',
         'text': text},
    ]}
    headers = {'Ocp-Apim-Subscription-Key': "d20c819104a04b1083286a8a15e93f16"}
    response = requests.post(key_phrase_api_url, headers=headers, json=documents)
    key_phrases = response.json()
    return key_phrases['documents'][0]['keyPhrases']


def count_changes(text: str) -> int:
    # Input str: text difference from wdiff as input
    # Output int: total number of changes in words
    dif = text.splitlines()
    num_changes = 0
    for line in dif:
        if '<ins>' in line:
            word_list = nltk.word_tokenize(
                line[re.search('<ins>', line).end():re.search('</ins>', line).start()])
            num_changes += len(word_list)
        if '<del>' in line:
            word_list = nltk.word_tokenize(
                line[re.search('<del>', line).end():re.search('</del>', line).start()])
            num_changes += len(word_list)
    return num_changes


# WIP
def type_of_change(list_of_diffs: list):
    # Input list: List of strings, consisting of consecutive text diffs from wdiff
    # Output list: List of int, corresponding commit type for the diffs
    # 0 : do not commit
    # 1 : Add §
    # 2 : Small changes
    # 3 : Edit § #TODO also output which was edited, how?
    
    out = []
    # at least this many word changes have to be added/deleted in a paragraph to qualify for a paragraph commit
    paragraph_treshold = 7
    # POSTs without changes are discarded (assumption) so I assume every POST here has actual changes
    scope_hist = []  # record scopes aka edited paragraphs of a POST
    count_hist = []  # record count of words added/deleted by a POST
    post_id_hist = []
    paragraph_added_hist = []
    posts_waiting = False  # are posts queued for a commit?
    scope_switched = False  # did the scope switch since the last POST?
    num_of_paragraphs = 0
    for k, difference in enumerate(list_of_diffs):
        # Check scopes
        changes = which_paragraph_changed(difference)
        scope = np.arange(len(changes))[changes] if changes is not None else []
        # scope_hist.append(scope)
        scope_hist.append(tuple(scope))
        post_id_hist.append(k)
        # only POSTs that change a single Scope can be "§ edit" commits
        single_scope = len(scope == 1)
        if len(scope_hist) > 1:
            scope_switched = (scope == scope_hist[-1])
            posts_waiting = True
        else:
            scope_switched = False

        count_hist.append(count_changes(difference))

        # Check if § was added
        paragraph_added = (
            len(changes) - num_of_paragraphs) > 0 if k != 0 else False
        num_of_paragraphs = len(changes)
        paragraph_added_hist.append(paragraph_added)

        # Do commit
        # TODO COMMIT and delete corresponding histories
        # find out which POSTs to commit
        if single_scope:
            current_scope = scope
            words_changed = 0
            for i in reversed(range(len(scope_hist))):
                # scope_hist[i] != current_scope:
                if all(scope_hist[i] != current_scope):
                    break
                else:
                    words_changed += count_hist[i]
            print('POST ', k, ' added ', words_changed, ' words in §', scope[0])

        # Check if we qualified for a commit, then commit waiting POSTs (if there are POSTs waiting for commit)
        # then we made enough changes to qualify for a paragraph commit
        if posts_waiting and (words_changed >= paragraph_treshold):
            print('You should commit POST ', post_id_hist[i], ' as: ', end='')
            if any(paragraph_added_hist[:i+1]):
                out.append(1)
                print('Add a §')
            elif len(list(set(scope_hist[:i+1]))) > 1:
                out.append(2)
                print(scope_hist[:i+1], len(np.unique(scope_hist[:i+1])))
                print('small changes')
            else:
                out.append(3)
                print('Edit of § ', scope_hist[0][0])
            posts_waiting = False  # We commited all waiting POSTs in the queue

            # Clear POST history
            del(post_id_hist[:i+1])
            del(scope_hist[:i+1])
            del(count_hist[:i+1])
            del(paragraph_added_hist[:i+1])
        else:
            out.append(0)
    return out


if __name__ == "__main__":
    with open('text1.txt', 'r') as f:
        text1_ = f.read()
    with open('text3.txt', 'r') as f:
        text2_ = f.read()
    print(is_difference_large(text1_, text2_))

    with open('example.md', 'r') as f:
        example_md = f.read()
    print(which_paragraph_changed(example_md))
    # print(keyphrase_extraction("I really hate Azure because it is a bad documented service."))
#     print(keyphrase_extraction('''The First Picture Of A Black Hole
# Katie Bouman led development of a computer program that made the breakthrough image possible.
# The remarkable photo, showing a halo of dust and gas 500 million trillion km from Earth, was released on Wednesday. For Dr Bouman, its creation was the realization of an endeavor previously thought impossible.'''))
    print(keyphrase_extraction('''Katie Bouman led development of a computer program that made the breakthrough image possible.
The remarkable photo, showing a halo of dust and gas 500 million trillion km from Earth, was released on Wednesday.'''))
    print(keyphrase_extraction('''Kip Thorne  made some cool but wrong visual effects.'''))