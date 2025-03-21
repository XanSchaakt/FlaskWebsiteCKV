from flask import Flask, render_template, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'  # Zet een echte geheime sleutel in productie
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Gebruik een database
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

# Database model voor gebruikers
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        new_user = User(username=username, password=password)

        try:
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('login'))
        except:
            return 'Er is een fout opgetreden bij het toevoegen van de gebruiker.'

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()

        if user and user.password == password:  # Let op: in een echte app gebruik je bcrypt voor wachtwoorden!
            login_user(user)
            return redirect(url_for('profile'))

        return 'Inloggen mislukt!'

    return render_template('login.html')

@app.route('/profile')
@login_required
def profile():
    return f'Welkom, {current_user.username}! Dit is je profielpagina.'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
