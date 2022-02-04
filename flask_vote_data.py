from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('learn.html')

@app.route('/Tw_Town.js')
def Tw_Town():
    return render_template('Tw_Town.js')

@app.route('/learn_df.js')
def learn_df():
    return render_template('learn_df.js')

@app.route('/taoyuan/')
def taoyuan():
    return render_template('learn.html')

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)