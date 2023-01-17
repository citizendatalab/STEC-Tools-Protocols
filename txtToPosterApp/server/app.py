from flask import Flask, jsonify, request, Response, make_response
from flask_cors import CORS
from flask import render_template
from fpdf import FPDF
import nltk
import re, string, unicodedata
from nltk.corpus import stopwords
from collections import Counter
import logging

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__,
		static_url_path='',
		static_folder = "./public")
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


def clean_text(txt, language="dutch"):
    txt = re.sub(r"http\S+", "", txt)
    tokens = nltk.word_tokenize(txt)
    words = remove_non_ascii(tokens)
    words = to_lowercase(words)
    words = remove_punctuation(words)
    words = remove_numbers(words)
    words = remove_stopwords(words, language)

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
    return [(d,word_count_dict[d], False) for d in word_count_dict if word_count_dict[d] > min_occurence-1 and len(d) >= min_word_length]


def writeLog():
    pass
    #logging.basicConfig(level=logging.INFO)
    #logging.debug('This will get logged')

def createPDF(words, titlesource, columns=2) :
    pdf = FPDF(format='A3')
    #pdf.add_font('Karla', '', './fonts/Karla-Regular.ttf', uni=True)
    pdf.add_page()
    topValue = words[0][1]
    lowValue = words[len(words)-1][1]
    previousValue = 0
    fontsize = 60
    max_wordsize = 0
    column = 1
    counter = 0
    if titlesource != '':
        pdf.set_font("Arial", size=10)
        pdf.set_xy(0, 5)
        pdf.cell(0, 0, txt=titlesource, ln=1, align='R')

    for word in words:
        if word[2]:
            continue
        if counter == 0:
            fontsize = 60
        else:
            fontsize = fontsize - ((previousValue - word[1]) * (45/((topValue-lowValue)+1)))
        pdf.set_font("Arial", size=fontsize)
        if column == 2 and columns == 3:
            pdf.set_x(total_wordsize+30)
        elif column == 2 and columns == 2:
            pdf.set_x(total_wordsize + 60)
        elif column == 3:
            pdf.set_x(total_wordsize+max_wordsize+50)
        pdf.cell(0, fontsize*0.45, txt=word[0] + ' (' + str(word[1]) + ')', ln=1)
        if counter > 1 and column != 3:
            wordsize = pdf.get_string_width(word[0] + ' (' + str(word[1]) + ')')
            if wordsize > max_wordsize:
                max_wordsize = wordsize
        #print((1*pdf.y) / pdf.page_break_trigger* >0.90)
        if (1*pdf.y) / pdf.page_break_trigger > 0.95:
            if column == 1:
                if columns == 1:
                    break
                else:
                    pdf.set_xy(120,70)
                    column = 2
                    total_wordsize = max_wordsize
                    max_wordsize = 0
            elif column == 2:
                if columns == 2:
                    break
                else:
                    column = 3
                    pdf.set_xy(220, 70)
            elif column == 3:
                break
        previousValue = word[1]
        counter += 1
    return pdf

# sanity check route
@app.route("/")
def index():
    return render_template("index.html")

@app.route('/text', methods=['POST'])
def format_text():
    post_data = request.get_json()
    txt = post_data['text']
    min_occurence = post_data['min_num_occ']
    min_word_length = post_data['min_word_length']
    language = post_data['language']
    cleantxt = clean_text(txt, language)
    wordcounts = count_words(cleantxt, min_occurence=int(min_occurence), min_word_length=int(min_word_length))
    wordcounts.sort(key=lambda x: x[1], reverse=True)

    return jsonify(wordcounts)


@app.route('/pdf', methods=['POST'])
def create_pdf():
    post_data = request.get_json()
    wordlist = post_data['wordlist']
    columns = post_data['columns']
    titlesource = post_data['title_source']
    pdf = createPDF(wordlist, titlesource, columns=int(columns))
    trackUsage = writeLog()
    response = make_response(pdf.output(dest='S').encode('latin-1'))
    response.headers.set('Content-Disposition', 'attachment', filename='test.pdf')
    response.headers.set('Content-Type', 'application/pdf')
    return response

if __name__ == '__main__':
    app.run()