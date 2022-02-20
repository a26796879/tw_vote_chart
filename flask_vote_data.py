from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('learn.html')

@app.route('/taoyuan/')
def taoyuan():
    return render_template('/taoyuan/learn.html')

@app.route('/kaohsiung/')
def kaohsiung():
    return render_template('/kaohsiung/learn.html')

@app.route('/tainan/')
def tainan():
    return render_template('/tainan/learn.html')

@app.route('/taoyuan/vote_datasets/107年直轄市議員/桃園市/第01選區.js')
def taoyuan_learn_df():
    return render_template('./vote_datasets/107年直轄市議員/桃園市/第01選區.js')

@app.route('/taoyuan/map_data/桃園市桃園區.js')
def taoyuan_data_df():
    return render_template('./map_data/桃園市桃園區.js')

@app.route('/kaohsiung/vote_datasets/107年直轄市議員/高雄市/第07選區.js')
def kaohsiung_learn_df():
    return render_template('./vote_datasets/107年直轄市議員/高雄市/第07選區.js')

@app.route('/kaohsiung/map_data/高雄市三民區.js')
def kaohsiung_data_df():
    return render_template('./map_data/高雄市三民區.js')

@app.route('/tainan/vote_datasets/107年直轄市議員/臺南市/第02選區.js')
def tainan_learn_df():
    return render_template('./vote_datasets/107年直轄市議員/臺南市/第02選區.js')

@app.route('/tainan/map_data/臺南市北門區.js')
def tainan_data_df():
    return render_template('./map_data/臺南市北門區.js')

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=80)