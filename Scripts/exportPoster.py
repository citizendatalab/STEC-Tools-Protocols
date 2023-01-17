
from fpdf import FPDF
import txt_info
import nltk
import re, string, unicodedata
from nltk.corpus import stopwords
from collections import Counter

def clean_text(txt):
    txt = re.sub(r"http\S+", "", txt)
    tokens = nltk.word_tokenize(txt)
    words = remove_non_ascii(tokens)
    words = to_lowercase(words)
    words = remove_punctuation(words)
    words = remove_numbers(words)
    words = remove_stopwords(words, 'dutch')

    return words


##FROM https://gist.github.com/MrEliptik/b3f16179aa2f530781ef8ca9a16499af
def remove_non_ascii(words):
    """Remove non-ASCII characters from list of tokenized words"""
    new_words = []
    for word in words:
        new_word = unicodedata.normalize('NFKD', word).encode('ascii', 'ignore').decode('utf-8', 'ignore')
        new_words.append(new_word)
    return new_words


def to_lowercase(words):
    """Convert all characters to lowercase from list of tokenized words"""
    new_words = []
    for word in words:
        new_word = word.lower()
        new_words.append(new_word)
    return new_words


def remove_punctuation(words):
    """Remove punctuation from list of tokenized words"""
    new_words = []
    for word in words:
        new_word = re.sub(r'[^\w\s]', '', word)
        if new_word != '':
            new_words.append(new_word)
    return new_words

def remove_numbers(words):
    """Replace all interger occurrences in list of tokenized words with textual representation"""
    new_words = []
    for word in words:
        if not word.isdigit():
            new_words.append(word)
    return new_words


def remove_stopwords(words, language='english'):
    """Remove stop words from list of tokenized words"""
    new_words = []
    for word in words:
        if word not in stopwords.words(language):
            new_words.append(word)
    return new_words

def count_words(words, min_occurence=2, min_word_length=3):
    word_count_dict = Counter(words)
    return [(d,word_count_dict[d]) for d in word_count_dict if word_count_dict[d] > min_occurence-1 and len(d) >= min_word_length]


def createPDF(words, columns=2):
    pdf = FPDF(format='A3')
    pdf.add_font('Karla', '', r"C:\Projects\TextToPoster\fonts\Karla-Regular.ttf", uni=True)
    pdf.add_page()
    topValue = words[0][1]
    lowValue = words[len(words)-1][1]
    previousValue = 0
    fontsize = 60
    max_wordsize = 0
    column = 1
    counter = 0
    for word in words:
        if counter == 0:
            fontsize = 60
        else:
            fontsize = fontsize - ((previousValue - word[1]) * (45/((topValue-lowValue)+1)))  # why 3.2 see below
        print(fontsize)
        pdf.set_font("Karla", size=fontsize)
        if column == 2:
            pdf.set_x(total_wordsize+30)
        elif column == 3:
            pdf.set_x(total_wordsize+max_wordsize+60)
        pdf.cell(0, fontsize*0.53, txt=word[0] + ' (' + str(word[1]) + ')', ln=1)

        wordsize = pdf.get_string_width(word[0] + ' (' + str(word[1]) + ')')
        if wordsize > max_wordsize:
            max_wordsize = wordsize
            print(max_wordsize)

        #print((1*pdf.y) / pdf.page_break_trigger* >0.90)
        if (1*pdf.y) / pdf.page_break_trigger > 0.95:
            if column == 1:
                if columns == 1:
                    break
                else:
                    pdf.set_xy(120,50)
                    column = 2
                    total_wordsize = max_wordsize
                    max_wordsize = 0
            elif column == 2:
                if columns == 2:
                    break
                else:
                    column = 3
                    pdf.set_xy(220, 50)
            elif column == 3:
                break
        previousValue = word[1]
        counter += 1
    pdf.output("simple_demo.pdf")


if __name__ == "__main__":
    txt = txt_info.text
    cleantxt = clean_text(txt)
    wordcounts = count_words(cleantxt, min_occurence=2, min_word_length=4)
    wordcounts.sort(key=lambda x: x[1], reverse=True)

    #SEND BACK WORDCOUNTS -> LET USER EDIT

    print(wordcounts)

    createPDF(wordcounts[1:], columns=2)

