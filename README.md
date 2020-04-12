Local instructions, prereqs:
```
pip3 install flask gunicorn flask_cors
npm install
npm run build
```

Local Deploy:
```
gunicorn wsgi:app
```

For Development, use two terminals and run in each:
```
npm start
gunicorn wsgi:app
```

Heroku instructions
```
heroku apps:create <app-name(shootehead)>
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/python
git push heroku master
```
