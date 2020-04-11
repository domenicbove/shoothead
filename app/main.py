import random
from flask import Flask, render_template, json, request
# Adding cors for development
# TODO remove in final product since it is all over the same port
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_folder='../build/static', template_folder='../build')
# TODO remove cors stuff
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

deck = []
players = []
max_players = 4
pile = []

"""
card_int % 13 -> [0,1,2...,13]
int = card value
0 = 2
1 = 3
5 = 7
8 = 10
9 = J
10 = Q
11 = K
12 = A

Therefore 0, 5 and 8 are the magics!
"""

"""
Rules for front end

if len(pile) == 0:
    you can play any card

if card is 10, play no matter what and burn the pile
if card is 2 play no matter what and dont increment the turn... maybe there needs to be a turn api call

if top card is a 7, then card value must be 7 or lower (2/10 would have been played at this point)

otherwise card MUST be greater than top card
# TODO make api for picking up the pile

card_int % 13 -> [0,1,2...,13]
int = card value
0 = 2
1 = 3
5 = 7
8 = 10
9 = J
10 = Q
11 = K
12 = A
Therefore 0, 5 and 8 are the magics!
"""

# TODO keep track of turn, should be some sort of modulo around the player list

@app.route('/')
def index():
    return render_template('index.html')

# TODO this is old, but hooks into the front end
@app.route('/hello') # take note of this decorator syntax, it's a common pattern
def hello():
    # It is good practice to only call a function in your route end-point,
    # rather than have actual implementation code here.
    # This allows for easier unit and integration testing of your functions.
    return get_hello()

def get_hello():
    greeting_list = ['Ciao', 'Hei', 'Salut', 'Hola', 'Hallo', 'Hej']
    # return random.choice(greeting_list)
    response = {'greeting': random.choice(greeting_list)}
    return response




# Frontend needs to Get all players
# TODO - see their top cards
@app.route('/players', methods = ['GET'])
def get_players():
    response = {'players': players}
    return response

# Frontend needs to create users
# curl -H "Content-type: application/json" -X POST http://127.0.0.1:8000/players -d '{"name":"Dommy"}'
@app.route('/players', methods = ['POST'])
def add_player():
    global players
    player_object = request.json
    if player_object['name'] not in players and len(players) < max_players:
        players = players + [player_object['name']]
    return get_players()

# Front end needs to get n cards from backend
# curl -H "Content-type: application/json" -X POST http://127.0.0.1:8000/deal -d '{"count":6}'
@app.route('/deal', methods = ['POST'])
def deal():
    card_request_object = request.json
    requested_count = card_request_object['count']
    return_cards = []
    for i in range(requested_count):
        if len(deck) > 0:
            return_cards = return_cards + [deck.pop()]
    response = {'deal': return_cards}
    return response

# Players need to play a card on the pile and either in the front or back validation of that play needs to happen
# Front end makes some sense since front end should know the top card on the pile, maybe both...
# Rules enforcement should really be on the front end the more i think of it, dont let anyone attempt the play
# curl -H "Content-type: application/json" -X POST http://127.0.0.1:8000/play -d '{"card":6}'
@app.route('/play', methods = ['POST'])
def play():
    global pile
    play_object = request.json
    card_int = play_object['card']
    pile = pile + [card_int]
    return "ok"

# Players need the ability to pick up the pile
@app.route('/pick_up', methods = ['GET'])
def pick_up():
    response = {'pile': pile}
    return response

@app.route('/shuffle', methods = ['GET'])
def shuffle():
    global deck
    deck = []
    deck.extend(range(52))
    random.shuffle(deck)
    return "ok"

if __name__ == '__main__':
    app.run()
