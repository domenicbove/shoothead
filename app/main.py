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
# players = []
players = {}

max_players = 10
pile = []
# Turn can be an index incrementing thru the playerlist

"""
Rules:
if len(pile) == 0:
    you can play any card

if card is 10, play no matter what and burn the pile
if card is 2 play no matter what and dont increment the turn... maybe there needs to be a turn api call

if top card is a 7, then card value must be 7 or lower (2/10 would have been played at this point)

otherwise card MUST be greater than top card
# TODO make api for picking up the pile
"""

# Serves up the Web Frontend
@app.route('/')
def index():
    return render_template('index.html')

# Frontend needs to Get all players
# Dont return sensitive data (ie their hand/bottom cards)
# curl http://127.0.0.1:8000/players
@app.route('/players', methods = ['GET'])
def get_players():
    # TODO consider sensitive data, for now lets just return everything to the front end
    # non_sensitive_players = []
    # for player in players:
    #     non_sensitive_player = {'name': player, 'topCards': players[player]['topCards']}
    #     non_sensitive_players = non_sensitive_players + [non_sensitive_player]
    # response = {'players': non_sensitive_players}
    return players

# Frontend needs to create users
# curl -H "Content-type: application/json" -X POST http://127.0.0.1:8000/players -d '{"name":"Dommy"}'
@app.route('/players', methods = ['POST'])
def add_player():
    global players
    player_object = request.json
    print('Adding player ' + player_object['name'])
    if len(players) < max_players:
        players[player_object['name']] = {'bottomCards': [], 'topCards': [], 'hand': []}
        print(players)
    return "ok"

@app.route('/shuffle', methods = ['GET'])
def shuffle():
    global deck
    deck = []

    for s in ['♣', '♠', '♥', '♦']:
        for n in range(2, 11):
          card = {'suit':s, 'rank':str(n)}
          deck = deck + [card]
        for m in ['J', 'Q', 'K', 'A']:
          card = {'suit':s, 'rank':m}
          deck = deck + [card]

    random.shuffle(deck)
    return "ok"

# Front end needs to get n cards from backend
# curl -H "Content-type: application/json" -X POST http://127.0.0.1:8000/deal -d '{"count":6, "player": "dom"}'
@app.route('/deal', methods = ['POST'])
def deal():
    card_request_object = request.json
    requested_count = card_request_object['count']
    player_name = card_request_object['player']

    print("Dealing " + str(requested_count) + ' cards. There are ' + str(len(deck)) + ' cards left for player ' + player_name)
    return_cards = []
    for i in range(requested_count):
        if len(deck) > 0:
            players[player_name]['hand'] += [deck.pop()]
            # return_cards = return_cards + [deck.pop()]
    # response = {'deal': return_cards}
    return "ok"

# Players need to play a card on the pile and either in the front or back validation of that play needs to happen
# Front end makes some sense since front end should know the top card on the pile, maybe both...
# Rules enforcement should really be on the front end the more i think of it, dont let anyone attempt the play
# curl -H "Content-type: application/json" -X POST http://127.0.0.1:8000/play -d '{"play":[{"suit":"♣","rank":"3"}]}'
@app.route('/play', methods = ['POST'])
def play():
    global pile
    play_object = request.json

    # Could be a list of cards, in which case the rank must be the same
    card_list = play_object['play']
    for card in card_list:
        # TODO check the ranks are equal
        # TODO check the card(s) can be played
        pile = pile + [card]
    return "ok"

# curl -H "Content-type: application/json" -X POST http://127.0.0.1:8000/playCard -d '{"suit":"♣","rank":"3"}'
@app.route('/playCard', methods = ['POST'])
def playCard():
    global pile
    card_object = request.json
    print(card_object)
    pile = pile + [card_object]
    return "ok"

# Players need the ability to pick up the pile
@app.route('/pick_up', methods = ['GET'])
def pick_up():
    global pile
    response = {'pile': pile}
    pile = []
    return response

# Web frontend needs to know the pile
@app.route('/pile', methods = ['GET'])
def get_pile():
    response = {'pile': pile}
    return response

shuffle()

if __name__ == '__main__':
    app.run()
