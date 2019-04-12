import numpy as np
import re
from flair.data import Sentence
from flair.embeddings import WordEmbeddings, DocumentPoolEmbeddings
from sklearn.metrics.pairwise import cosine_similarity


def is_different_large(text1, text2):
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
    re.
    pass


if __name__ == "__main__":
    with open('text1.txt', 'r') as f:
        text1_ = f.read()
    with open('text3.txt', 'r') as f:
        text2_ = f.read()
    is_different_large(text1_, text2_)


