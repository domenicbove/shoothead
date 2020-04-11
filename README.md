Local instructions, prereqs:
```
pip3 install flask gunicorn
npm install
```

Local Deploy:
```
gunicorn wsgi:app
```

Heroku instructions
```
heroku apps:create <app-name(shootehead)>
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/python
git push heroku master
```
