import numpy as np
import re
import nltk
from flair.data import Sentence
from flair.embeddings import WordEmbeddings, DocumentPoolEmbeddings
from sklearn.metrics.pairwise import cosine_similarity


def is_difference_large(text1, text2):
    text1_preproccessed = Sentence(text1)
    text2_preproccessed = Sentence(text2)

    glove_embedding = WordEmbeddings('glove')
    document_embedding = DocumentPoolEmbeddings([glove_embedding])
    document_embedding.embed(text1_preproccessed)
    document_embedding.embed(text2_preproccessed)

    text1_embedding = text1_preproccessed.get_embedding()
    text2_embedding = text2_preproccessed.get_embedding()
    text1_embedding = np.reshape(text1_embedding, (-1, 1))
    text2_embedding = np.reshape(text2_embedding, (-1, 1))
    similarity = cosine_similarity(text1_embedding, text2_embedding)
    print(np.mean(similarity))


def which_paragraph_changed(text):
    list_of_paragraphs = re.findall(r"[^#]+", text)
    has_changes = [_check_if_has_diff(paragraph) for paragraph in list_of_paragraphs]
    print(has_changes)


def _check_if_has_diff(text):
    diff_tokens = ["<ins>", "<del>"]
    return any(diff_token in text for diff_token in diff_tokens)


def count_changes(difference):
    # Takes difference from wdiffhtml as input
    # Returns total number of changes in words
    dif = difference.splitlines()
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


if __name__ == "__main__":
    # with open('text1.txt', 'r') as f:
    #     text1_ = f.read()
    # with open('text3.txt', 'r') as f:
    #     text2_ = f.read()
    # is_difference_large(text1_, text2_)

    with open('example.md', 'r') as f:
        example_md = f.read()
    which_paragraph_changed(example_md)


