# Enhance Student Life
Google Docs, MS OneNote, and Word are great, even indispensable tools to write essays, transcripts, or your thesis.
Not so long ago, most people would save a document and add a date manually, to have some kind of version control.
Now, Google Docs or MS Word do this automatically in the background.
However, if you need to return to an older version of your work, the date won't tell you much about the changes you made to this version.
If you then need to dig through older versions and a deadline is very close, a panic attack might flare-up.
We can consider us happy to be able to use proper version control for our work, but unfortunately most non-techies are intimidated by the idea to actively maintain version control.
But, we think everyone should use version control and therefore we developed a solution for students and who ever writes texts that automatically generates meaningful commit messages throughout your writing process.
We call it SaveMyThesis and let's see how it works.

# Example
We wrote a web app in which you can work on markdown files.
However, this could be some WYSIWYG editor like MS Word.
Let's suppose I am writing a small home work about black holes.
That is how far I got. Oh shoot, I made some mistakes. Well, those words are difficult to write, but I will quickly correct them.
Oh look, SaveMyThesis automatically created a version and described what I did.
In a home work about black holes I must not forget to write about the first image a block hole that was published three days ago.
Here, I found a nice webpage. I will just copy this snippet as an example. Of course I would write this part myself.
After a short time, again a commit message was made.
Now there is just one last edit I need to make.
Kip Thorne made some cool but wrong visual effects.
And SaveMyThesis tracked also this.

# How does it work?
We used four key methods to implement SaveMyThesis. We count the amount of words diffs and track them over time. E.g. too small changes most likely won't elicit a commit message. Then the scope is important.
We dissect the document into meaningful chunks, in this case using sections.
If many changes happen within one scope, we start preparing a commit message.
If the scope changes, and several changes happen there, SaveMyThesis decided that something worth committing might have finished in the above scope.
How do we decide if the large amount of changed word has a semantic meaning and is worht commiting or is just some rephrasing?
We used pretrained word embeddings to capture the semantic of a text numerically and compare it with the embedding of the last commit.
Is the cosine-similarity below some threshold, the change is significant and we commit.
We found the threshold by testing but this could be solved better as a classification problem using labeled data.
To detect whether we added or edited a section is not smart, but describe the changes is.
For this, we used Azure's keyPhrase extraction on the text.
This is a small example, but, most work probably consist of much more commits.
To navigate conveniently through them, we built a chatbot using Azure's QnA Bot that helps you find the version you are looking for.
